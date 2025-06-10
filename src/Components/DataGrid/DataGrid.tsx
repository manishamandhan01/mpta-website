import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {NoteDefault, SetupSetting, TradeRow, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type TradeDataGridProps = {
    onRowsChange?: (rows: TradeRow[]) => void;
};

const TradeDataGrid: React.FC<TradeDataGridProps> = ({ onRowsChange }) => {
    const {tradeRows, setTradeRows, finalTradeRows, setFinalTradeRows, tradingSetting} = useGlobalStore();

    const columns: GridColDef<TradeRow>[] = [
        { field: 'date', headerName: 'DATE', width: 120, editable: true },
        { field: 'ticker', headerName: 'STOCK CODE', width: 120, editable: true },
        { field: 'action', headerName: 'ACTION', width: 100, editable: true },
        { field: 'price', headerName: 'PRICE', width: 100, editable: true, type: 'number' },
        { field: 'volume', headerName: 'VOLUME', width: 100, editable: true, type: 'number' },
        { field: 'over_write_fees', headerName: 'O.WRITE FEES', width: 120, editable: true, type: 'number' },
        { field: 'fees', headerName: 'FEES', width: 100, editable: false, type: 'number'},
        { field: 'netAmount', headerName: 'NET AMOUNT (Php)', width: 150, editable: false, type: 'number' },
        { field: 'avePrice', headerName: 'AVE. PRICE', width: 120, editable: false, type: 'number' },
        { field: 'profit', headerName: 'PROFIT (Php)', width: 120, editable: false, type: 'number' },
        { field: 'percentProfit', headerName: '% PROFIT', width: 100, editable: false },
        // { field: 'days', headerName: 'DAYS', width: 80, editable: false, type: 'number' },
        { field: 'rmul', headerName: 'R-MUL.', width: 90, editable: false},
        { field: 'equity', headerName: 'EQUITY (Php)', width: 130, editable: false, type: 'number' },
        {
            field: 'setup',
            headerName: 'SETUP',
            width: 120,
            editable: true,
            renderEditCell: (params) => {
                const { value, api, id, field } = params;

                const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
                    api.setEditCellValue({ id, field, value: event.target.value }, event);
                };

                return (
                    <select value={value || ''} onChange={handleChange} style={{ width: '100%' }}>
                        <option value="">-- Select --</option>
                        {tradingSetting.setupSettings.map((option: SetupSetting) => (
                            <option key={option.setup} value={option.setup}>
                                {option.setup}
                            </option>
                        ))}
                    </select>
                );
            }
        },
        { field: 'reason', headerName: 'REASON FOR BUYING / SELLING', width: 250, editable: true, type: 'singleSelect',
        valueOptions: tradingSetting.noteDefaults.map((option: NoteDefault) => option.reason)},
        { field: 'notes', headerName: 'ADDITIONAL NOTES', width: 250, editable: true }
    ];

    const [showPasteBox, setShowPasteBox] = useState(false);
    const [pasteText, setPasteText] = useState('');

    const handlePasteSubmit = () => {
        const lines = pasteText.trim().split(/\r?\n/);
        const newRows: TradeRow[] = lines.map((line, index) => {
            const values = line.split('\t');
            return {
                id: Date.now() + index,
                date: values[0] || '',
                ticker: values[1] || '',
                action: values[2] || '',
                price: parseFloat(values[3].replace(/,/g, "")) || 0,
                volume: parseInt(values[4].replace(/,/g, "")) || 0,
                over_write_fees: parseFloat(values[5]?.replace(/,/g, "")) || 0,
                fees: parseFloat(values[6]?.replace(/,/g, "")) || 0,
                netAmount: parseFloat(values[7]?.replace(/,/g, "")) || 0,
                avePrice: parseFloat(values[8]?.replace(/,/g, "")) || 0,
                profit: parseFloat(values[9]?.replace(/,/g, "")) || 0,
                percentProfit: values[10] || '',
                days: parseInt(values[11]) || 0,
                rmul: values[12] || '',
                equity: parseFloat(values[13]?.replace(/,/g, "")) || 0,
                setup: values[14] || '',
                reason: values[15] || '',
                notes: values[16] || ''
            };
        });
        const updatedRows = [...newRows];
        setTradeRows(updatedRows);
        setFinalTradeRows(updatedRows);
        setPasteText('');
        setShowPasteBox(false);
        onRowsChange?.(updatedRows);
    };

    const handleRowUpdate = (newRow: TradeRow) => {
        const updated = tradeRows.map((r) => (r.id === newRow.id ? newRow : r));
        setTradeRows(updated);
        onRowsChange?.(updated); // 👈 Update parent
        return newRow;
    };

    return (
        <Box sx={{ width: '100%' }}>
            <button
                onClick={() => setShowPasteBox(!showPasteBox)}
                style={{ marginBottom: 12, padding: '6px 12px' }}
            >
                📋 Paste Rows from Excel
            </button>

            {showPasteBox && (
                <Box sx={{ mb: 2 }}>
                    <p>Paste tab-separated rows (copied from Excel or Sheets):</p>
                    <textarea
                        value={pasteText}
                        onChange={(e) => setPasteText(e.target.value)}
                        rows={6}
                        style={{ width: '100%', fontFamily: 'monospace' }}
                        placeholder="Paste rows here..."
                    />
                    <div style={{ marginTop: 8 }}>
                        <button onClick={handlePasteSubmit}>✅ Import Rows</button>
                    </div>
                </Box>
            )}

            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={finalTradeRows}
                    columns={columns}
                    processRowUpdate={handleRowUpdate}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } }
                    }}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    getCellClassName={(params) => {
                        if (!params.isEditable && ['profit', 'percentProfit', 'rmul'].includes(params.field)) {
                            const value = typeof params.value === 'number' ? params.value : parseFloat(params.value?.toString() || '0');
                            return value >= 0 ? 'non-editable-green-text-cell' : 'non-editable-red-text-cell';
                        } else if (!params.isEditable) {
                            return 'non-editable-cell';
                        } else {
                            return '';
                        }
                    }}
                />
            </Box>
        </Box>
    );
};

export default TradeDataGrid;
