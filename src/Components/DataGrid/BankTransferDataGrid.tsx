import React, {useState} from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {BankTransferRow, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";


const columns: GridColDef<BankTransferRow>[] = [
    // { field: 'serialNo', headerName: 'S.No.', width: 120, editable: false,  flex: 0,
    //     renderCell: (params) =>
    //         params.api.getRowIndexRelativeToVisibleRows(params.row.id) + 1
    // },
    { field: 'date', headerName: 'DATE', width: 120, editable: true },
    { field: 'action', headerName: 'ACTION', width: 100, editable: true },
    { field: 'grossAmount', headerName: 'Gross Amount', width: 200, editable: true, type: 'number' },
    { field: 'fess', headerName: 'Fees', width: 100, editable: true, type: 'number'},
    { field: 'netAmount', headerName: 'NET AMOUNT (Php)', width: 200, editable: false, type: 'number' },
    { field: 'notes', headerName: 'ADDITIONAL NOTES', width: 250, editable: true }
];

const TradeDataGrid: React.FC = () => {
    const {bankTransferRows, setBankTransferRows} = useGlobalStore();
    const [showPasteBox, setShowPasteBox] = useState(false);
    const [pasteText, setPasteText] = useState('');

    const handlePasteSubmit = () => {
        const lines = pasteText.trim().split(/\r?\n/);
        const newRows: BankTransferRow[] = lines.map((line, index) => {
            const values = line.split('\t');
            const grossAmount = parseFloat(values[2].replace(/,/g, "").replace(/Php/g, "")) || 0;
            let fees = 0;
            if (typeof values[3] === 'string') {
                fees = parseFloat(values[3].replace(/,/g, "").replace(/Php/g, "")) || 0;
            } else if (typeof values[3] === 'number') {
                fees = values[3];
            }
            const netAmount = grossAmount - fees;
            return {
                id: Date.now() + index,
                date: values[0] || '',
                action: values[1] || '',
                grossAmount: grossAmount,
                fees: fees,
                netAmount: netAmount,
                notes: values[5] || ''
            };
        });
        const updatedRows = [...newRows];
        setBankTransferRows(updatedRows);
        setPasteText('');
        setShowPasteBox(false);
    };

    const handleRowUpdate = (newRow: BankTransferRow) => {
        const updated = bankTransferRows.map((r) => (r.id === newRow.id ? newRow : r));
        setBankTransferRows(updated);
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
                    rows={bankTransferRows}
                    columns={columns}
                    processRowUpdate={handleRowUpdate}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } }
                    }}
                    disableRowSelectionOnClick
                    getCellClassName={(params) => {
                        if(!params.isEditable) return 'non-editable-cell';
                        else return '';
                    }}
                />
            </Box>
        </Box>
    );
};

export default TradeDataGrid;
