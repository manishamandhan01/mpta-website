import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';

import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

function createData(
    name?: string,
    $?: number,
    percentage?: number,
    Ticker?: string,
) {
    return { name, $, percentage, Ticker };
}

const rows = [
    createData('Risk Tier (% Capital at Risk)', 159, 6.0, 'MSFT'),
    createData('Stop Price', 159, 6.0),
    createData('Entry Price', 159),
    createData('Target Price', 159, 6.0),
    createData('Dollar Risk', 159),
    createData('Risk Per Share', 159),
    createData('Number Of Shares', 159),
    createData('Rounded Number Of Shares', 159),
    createData('Capital Allocation', 159, 6.0),
    createData('Potential Upside', 159, 6.0),

];



interface IPositionCalculatorResult {
    reset: () => void;
}
export const PositionCalculatorResult :React.FC<IPositionCalculatorResult>  = ({reset})=>{
    return (
        <>
            <div className="bg-gray-200 flex flex-col space-y-10 items-center rounded-2xl justify-center p-8 mr-24">


                <TableContainer component={Paper}>
                    <Table className="w-full" aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Equity Calculator</StyledTableCell>
                                <StyledTableCell align="right">$</StyledTableCell>
                                <StyledTableCell align="right">Percentage</StyledTableCell>
                                <StyledTableCell align="right">Ticker</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows.map((row) => (
                                <StyledTableRow key={row.name}>
                                    <StyledTableCell component="th" scope="row">
                                        {row.name}
                                    </StyledTableCell>
                                    <StyledTableCell align="right">{row.$}</StyledTableCell>
                                    <StyledTableCell align="right">{row.percentage}</StyledTableCell>
                                    <StyledTableCell align="right">{row.Ticker}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>

                    </Table>

                </TableContainer>
                <button
                    type="button"
                    className="w-64 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 "
                    onClick={reset}
                >
                    Reset
                </button>


            </div>
        </>
    )
}