// @flow
import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

type Props = {

};
export const DasboardAccountSummary = (props: Props) => {

    function createData(
        name: string,
        Lasttradedate: number,
        fills: number,
        InitialBalance: number,
        Adjustments: number,
        Pnl: number,
        FinalBalance: number,
        Options: number,
    ) {
        return { name, Lasttradedate, fills, InitialBalance, Adjustments , Pnl, FinalBalance, Options};
    }

    const rows = [
        createData('Default', 2024, 96, 24000, 4654821,25588963,254136,489),

    ];
    return (
        <div>
            <div className="dashboard-account-summary">
                <h1>ACCOUNT SUMMARY</h1>
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell align="right">Last Trade Date</TableCell>
                                <TableCell align="right">Fills</TableCell>
                                <TableCell align="right">Initial Balance</TableCell>
                                <TableCell align="right">Adjustments</TableCell>
                                <TableCell align="right">Pnl</TableCell>
                                <TableCell align="right">Final Balance</TableCell>
                                <TableCell align="right">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <TableRow
                                    key={row.name}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">
                                        {row.name}
                                    </TableCell>
                                    <TableCell align="right">{row.Lasttradedate}</TableCell>
                                    <TableCell align="right">{row.fills}</TableCell>
                                    <TableCell align="right">{row.InitialBalance}</TableCell>
                                    <TableCell align="right">{row.Adjustments}</TableCell>
                                    <TableCell align="right">{row.Pnl}</TableCell>
                                    <TableCell align="right">{row.FinalBalance}</TableCell>
                                    <TableCell align="right">{row.Options}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>

        </div>
    );
};