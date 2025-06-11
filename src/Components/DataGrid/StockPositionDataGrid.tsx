import React from 'react';
import { Box, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type TradeStat = {
    id: number;
    symbol: string;
    cumulative: string;
    trades: number;
    winRate: string;
    profitFactor: string;
    expectancy: string;
};

type Props = {
    topSymbols: TradeStat[];
    worstSymbols: TradeStat[];
};

const createColumns = (isTop: boolean, currencySymbol: string): GridColDef[] => [
    {
        field: 'symbol',
        headerName: 'Symbol',
        width: 100,
        headerAlign: 'center',
        align: 'left',
    },
    {
        field: 'cumulative',
        headerName: isTop ? 'Cumulative Profit' : 'Cumulative Loss',
        width: 150,
        headerAlign: 'center',
        align: 'right',
        cellClassName: isTop ? 'greenText' : 'redText',
        valueGetter: (value) => `${currencySymbol} ${value}`,
    },
    {
        field: 'trades',
        headerName: 'Trades',
        width: 90,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'winRate',
        headerName: 'Win Rate %',
        width: 110,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'profitFactor',
        headerName: 'Profit Factor',
        width: 120,
        headerAlign: 'center',
        align: 'center',
    },
    {
        field: 'expectancy',
        headerName: 'Expectancy',
        width: 120,
        headerAlign: 'center',
        align: 'right',
        cellClassName: isTop ? 'greenText' : 'redText',
    },
];

const StockPositionDataGrid: React.FC<Props> = ({ topSymbols, worstSymbols }) => {
    const { tradingSetting } = useGlobalStore();

    return (
        <Box sx={{ display: 'flex', gap: 4, p: 2 }}>
            {/* Top Symbols Grid */}
            <Box flex={1}>
                <Typography variant="h6" color="green" gutterBottom>
                    Top Symbols
                </Typography>
                <DataGrid
                    rows={topSymbols}
                    columns={createColumns(true, tradingSetting.currencySymbol)}
                    autoHeight
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    sx={{
                        '& .greenText': {
                            color: 'green',
                            fontWeight: 500,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                />
            </Box>

            {/* Worst Symbols Grid */}
            <Box flex={1}>
                <Typography variant="h6" color="red" gutterBottom>
                    Worst Symbols
                </Typography>
                <DataGrid
                    rows={worstSymbols}
                    columns={createColumns(false, tradingSetting.currencySymbol)}
                    autoHeight
                    pageSizeOptions={[5]}
                    disableRowSelectionOnClick
                    sx={{
                        '& .redText': {
                            color: 'red',
                            fontWeight: 500,
                        },
                        '& .MuiDataGrid-columnHeaders': {
                            backgroundColor: '#fdecea',
                        },
                    }}
                />
            </Box>
        </Box>
    );
};

export default StockPositionDataGrid;
