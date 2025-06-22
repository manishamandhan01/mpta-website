import React from 'react';
import Box from '@mui/material/Box';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {EvaluationSetting, MonthlyTradeRow, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type MonthlyReportDataGridProps = {
    // onRowsChange?: (rows: MonthlyTradeRow[]) => void;
    filteredTradeRows: MonthlyTradeRow[];
};

const MonthlyReportDataGrid: React.FC<MonthlyReportDataGridProps> = ({ filteredTradeRows }) => {
    const {tradingSetting} = useGlobalStore();

    const columns: GridColDef<MonthlyTradeRow>[] = [
        { field: 'month', headerName: 'Month', width: 120, editable: false },
        { field: 'beg_balance', headerName: 'Beg. Balance', width: 120, editable: false, type: "number" },
        { field: 'bank_transfer', headerName: 'Transfers', width: 120, editable: false, type: "number" },
        { field: 'total_profit', headerName: 'Total Profit', width: 100, editable: false, type: 'number' },
        { field: 'total_loss', headerName: 'Total Loss', width: 100, editable: false, type: 'number' },
        { field: 'dividend', headerName: 'Dividends', width: 100, editable: false, type: 'number' },
        { field: 'end_balance', headerName: 'End Balance', width: 100, editable: false, type: 'number' },
        { field: 'net_profit', headerName: 'Net Profit', width: 100, editable: false, type: 'number' },
        { field: 'profit_percent', headerName: 'Profit %', width: 100, editable: false, type: 'number' },
        { field: 'r_multiplier_sum', headerName: 'R-MUL Sum', width: 100, editable: false, type: 'number' },
        { field: 'no_of_trades', headerName: 'Trades', width: 100, editable: false, type: 'number' },
        { field: 'win_rate_percent', headerName: 'Win Rate %', width: 100, editable: false, type: 'number' },
        { field: 'average_win_percent', headerName: 'Avg. Win %', width: 100, editable: false, type: 'number' },
        { field: 'average_loss_percent', headerName: 'Avg Loss %', width: 100, editable: false, type: 'number' },
        { field: 'profit_factor', headerName: 'Profit Factor', width: 100, editable: false, type: 'number' },
    ];



    // const handleRowUpdate = (newRow: TradeRow) => {
    //     const updated = tradeRows.map((r) => (r.id === newRow.id ? newRow : r));
    //     setTradeRows(updated);
    //     onRowsChange?.(updated); // 👈 Update parent
    //     return newRow;
    // };

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ height: 600, width: '100%' }}>
                <DataGrid
                    rows={filteredTradeRows}
                    columns={columns}
                    getRowId={row => row.month}
                    // processRowUpdate={handleRowUpdate}
                    pageSizeOptions={[5, 10, 20, 50, 100]}
                    initialState={{
                        pagination: { paginationModel: { pageSize: 50 } }
                    }}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    getCellClassName={(params) => {
                        if (!params.isEditable && ['total_profit', 'total_loss', 'net_profit', 'profit_percent', 'r_multiplier_sum', 'average_loss_percent'].includes(params.field)) {
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

export default MonthlyReportDataGrid;
