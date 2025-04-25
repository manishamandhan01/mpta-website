import React, {useState} from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {DividendRow, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";


const columns: GridColDef<DividendRow>[] = [
    { field: 'symbol', headerName: 'SYMBOL', width: 120, editable: true },
    { field: 'dividendType', headerName: 'Dividend Type', width: 100, editable: true },
    { field: 'dateReceived', headerName: 'Date Received', width: 200, editable: true},
    { field: 'amountReceived', headerName: 'Amount Received', width: 100, editable: true, type: 'number' }
];

const DividendDataGrid: React.FC = () => {
    const {dividendRows, setDividendRows} = useGlobalStore();
    const [showPasteBox, setShowPasteBox] = useState(false);
    const [pasteText, setPasteText] = useState('');

    const handlePasteSubmit = () => {
        const lines = pasteText.trim().split(/\r?\n/);
        const newRows: DividendRow[] = lines.map((line, index) => {
            const values = line.split('\t');
            return {
                id: Date.now() + index,
                symbol: values[0] || '',
                dividendType: values[1] || '',
                dateReceived: values[2] || '',
                amountReceived: parseFloat(values[3].replace(/,/g, "").replace(/Php/g, "")) || 0
            };
        });
        const updatedRows = [...newRows];
        setDividendRows(updatedRows);
        setPasteText('');
        setShowPasteBox(false);
    };

    const handleRowUpdate = (newRow: DividendRow) => {
        const updated = dividendRows.map((r) => (r.id === newRow.id ? newRow : r));
        setDividendRows(updated);
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
                    rows={dividendRows}
                    columns={columns}
                    processRowUpdate={handleRowUpdate}
                    pageSizeOptions={[5, 10, 20]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 5 } }
                    }}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            </Box>
        </Box>
    );
};

export default DividendDataGrid;
