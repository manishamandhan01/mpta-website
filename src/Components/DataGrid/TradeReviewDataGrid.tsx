import React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {EvaluationSetting, TradeRow, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type TradeReviewDataGridProps = {
    onRowsChange?: (rows: TradeRow[]) => void;
};

const TradeReviewDataGrid: React.FC<TradeReviewDataGridProps> = ({ onRowsChange }) => {
    const {tradeRows, setTradeRows, finalTradeRows, tradingSetting} = useGlobalStore();

    const columns: GridColDef<TradeRow>[] = [
        { field: 'date', headerName: 'DATE', width: 120, editable: false },
        { field: 'ticker', headerName: 'STOCK CODE', width: 120, editable: false },
        { field: 'action', headerName: 'ACTION', width: 100, editable: false },
        { field: 'price', headerName: 'PRICE', width: 100, editable: false, type: 'number' },
        { field: 'volume', headerName: 'SHARES', width: 100, editable: false, type: 'number' },
        // { field: 'over_write_fees', headerName: 'O.WRITE FEES', width: 120, editable: true, type: 'number' },
        // { field: 'fees', headerName: 'FEES', width: 100, editable: false, type: 'number'},
        { field: 'netAmount', headerName: 'NET AMOUNT (Php)', width: 150, editable: false, type: 'number' },
        { field: 'avePrice', headerName: 'AVE. PRICE', width: 120, editable: false, type: 'number' },
        { field: 'profit', headerName: 'PROFIT (Php)', width: 120, editable: false, type: 'number' },
        { field: 'percentProfit', headerName: '% PROFIT', width: 100, editable: false },
        // { field: 'days', headerName: 'DAYS', width: 80, editable: false, type: 'number' },
        { field: 'rmul', headerName: 'R-MUL.', width: 90, editable: false},
        // { field: 'equity', headerName: 'EQUITY (Php)', width: 130, editable: false, type: 'number' },
        { field: 'setup', headerName: 'SETUP', width: 120, editable: false},
        { field: 'reason', headerName: 'REASON FOR BUYING / SELLING', width: 250, editable: false},
        { field: 'error_cause', headerName: 'CAUSE-OF-ERROR', width: 120, editable: true},
        {
            field: 'entry_exit',
            headerName: 'Entry/Exit',
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
                        {tradingSetting.evaluationSettings.map((option: EvaluationSetting) => (
                            <option key={option.entryExit} value={option.entryExit}>
                                {option.entryExit}
                            </option>
                        ))}
                    </select>
                );
            }
        },
        {
            field: 'emotion',
            headerName: 'Emotion',
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
                        {tradingSetting.evaluationSettings.map((option: EvaluationSetting) => (
                            <option key={option.emotion} value={option.emotion}>
                                {option.emotion}
                            </option>
                        ))}
                    </select>
                );
            }
        },
        { field: 'trend', headerName: 'Trend', width: 250, editable: true, type: 'singleSelect',
            valueOptions: ['UP', 'SIDE', 'DOWN']},
        { field: 'notes', headerName: 'ADDITIONAL NOTES', width: 250, editable: true }
    ];



    const handleRowUpdate = (newRow: TradeRow) => {
        const updated = tradeRows.map((r) => (r.id === newRow.id ? newRow : r));
        setTradeRows(updated);
        onRowsChange?.(updated); // 👈 Update parent
        return newRow;
    };

    return (
        <Box sx={{ width: '100%' }}>
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

export default TradeReviewDataGrid;
