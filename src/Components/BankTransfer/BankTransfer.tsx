// @flow 
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import {BankTransferModel} from "@Components/Models/BankTransferModel.tsx";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
} from "@mui/material";
import TradeDataGrid from "@Components/DataGrid/DataGrid.tsx";
import BankTransferDataGrid from "@Components/DataGrid/BankTransferDataGrid.tsx";

type Props = {};



export const transactions: BankTransferModel[] = [
    { date: "9/3/2017", action: "Deposit", grossAmount: "$100,000", fees: "", netAmount: "$100,000" },
    { date: "1/1/2018", action: "Deposit", grossAmount: "$100,000", fees: "", netAmount: "$100,000" },
    { date: "5/1/2019", action: "Deposit", grossAmount: "$100,000", fees: "", netAmount: "$100,000" },
    { date: "12/1/2019", action: "Withdraw", grossAmount: "$50,000", fees: "", netAmount: "-$50,000" },
    { date: "12/3/2019", action: "Deposit", grossAmount: "$10,000", fees: "", netAmount: "$10,000" },
];
export const BankTransfer = (props: Props) => {
    const [realizedProfit, setTotalGainPer] = React.useState<number>(7892);
    const [realizedLoss, setTotalLossPer] = React.useState<number>(794);
    const total = realizedProfit + realizedLoss;
    const profitPercentage = total ? (realizedProfit / total) * 100 : 0; // percentage of realized profit
    const lossPercentage = total ? (realizedLoss / total) * 100 : 0; //


    return (
        <div className="pb-5">
            {/*heading*/}
            <div>
                <div className="ua_top_item">
                    <ul>
                        {DashboardData.map((item, index: number) => {
                            return (
                                <li key={index}>
                                    <i className={item.icon}></i>
                                    <span> <a className="nav-link text_gray font_weight_400 " aria-current="page"
                                              href={item.label}>{item.label}</a></span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="">
                <div className="d-flex align-items-center ms-4 p-3">
                    <div className="bank-icon ">
                        <img className="heading-24" src="/public/bank.png"/></div>
                    <p className="ps-2">Bank Transfers</p>
                </div>

                <div className="row col-12 m-auto mt-2">
                    {/*CardOne*/}

                    <div className="col-xl-4 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative">
                            <div className="dashboard-overall-performance-card">
                                <p>OVERALL PROFIT/LOSS</p>
                                <div className="amounts mt-3    ">

                                    <table className="table mt-2" style={{borderCollapse: 'collapse'}}>
                                        <thead className="">
                                        <tr>

                                            <th className="font_Epilogue " style={{fontSize: '15px'}}></th>
                                            <th className="font_Epilogue " colSpan={2}
                                                style={{fontSize: '15px'}}>Profit
                                            </th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Profit%</th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td>Realized Profit</td>
                                            <td>$</td>
                                            <td>90716</td>
                                            <td>29.26%</td>
                                        </tr>
                                        <tr>
                                            <td>Realized Loss</td>
                                            <td>$</td>
                                            <td>-45616</td>
                                            <td>29.26%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Cash Dividend</td>
                                            <td>$</td>
                                            <td>90716</td>
                                            <td>-9.26%</td>
                                        </tr>
                                        <tr>
                                            <td>Realized P&L</td>
                                            <td>$</td>
                                            <td>90716</td>
                                            <td>1.26%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Realized Profit</td>
                                            <td>$</td>
                                            <td>90716</td>
                                            <td>29.26%</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                    <div
                                        className="profit-loss-bar mw-75 m-auto"
                                        style={{
                                            background: `linear-gradient(to right, green ${profitPercentage}%, red ${lossPercentage}%)`,
                                            width: '100%',
                                            height: '20px',
                                            borderRadius: '1px',
                                            marginTop: '3px',
                                        }}
                                    ></div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/*card2*/}
                    <div className="col-xl-8 col-md-7 col-sm-12">
                        <div className="portfolio-card-container   position-relative    box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="d-flex justify-content-between text-center mw-50 m-auto ">
                                    <div><p>PREVIOUS CUMULATIVE</p><p>NOV-19</p></div>
                                    <div><p>THIS PERIOD</p><p>NOV-19</p></div>
                                    <div><p> CUMULATIVE</p><p>NOV-19</p></div>

                                </div>

                                <div className="amounts mt-4 d-flex flex-row">
                                    <table className="table mt-2" style={{borderCollapse: 'collapse'}}>
                                        <thead>
                                        <tr>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}></th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}></th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}></th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}></th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td>Total Deposits</td>
                                            <td>$</td>
                                            <td>90716$</td>
                                            <td>90716$</td>
                                            <td>310,00</td>
                                        </tr>
                                        <tr>
                                            <td>Total Withdrawals</td>
                                            <td>$</td>
                                            <td>90716$</td>
                                            <td>90716$</td>
                                            <td>310,00</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Dividend</td>
                                            <td>$</td>
                                            <td>90716$</td>
                                            <td>90716$</td>
                                            <td>310,00</td>
                                        </tr>
                                        <tr>
                                            <td>Total Profit/Loss</td>
                                            <td>$</td>
                                            <td>90716$</td>
                                            <td>90716$</td>
                                            <td>310,00</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Total Equity</td>
                                            <td>$</td>
                                            <td>90716$</td>
                                            <td>90716$</td>
                                            <td>310,00</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                    <div className=" ms-5 me-5">
                                        <button className="circle-btn bg-light m-0"><i
                                            className="fa-solid fa-arrow-up icon-black icon-large-20"></i>
                                        </button>
                                        <button className="circle-btn bg-light m-0 mt-3"><i
                                            className="fa-solid fa-arrow-down icon-black icon-large-20"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>
                <div className="amounts mt-4 ms-3 me-3 d-flex flex-row">
                    <BankTransferDataGrid />

                    {/*<TableContainer component={Paper}>*/}
                    {/*    <Table>*/}
                    {/*        <TableHead >*/}
                    {/*            <TableRow  style={{ backgroundColor: "#e0e0e0" }}>*/}
                    {/*                <TableCell className={"text-center p-2"} ><b>S.No.</b></TableCell>*/}
                    {/*                <TableCell className={"text-center p-2"} ><b>DATE</b></TableCell>*/}
                    {/*                <TableCell className={"text-center"} ><b>ACTION</b></TableCell>*/}
                    {/*                <TableCell className={"text-center"} ><b>GROSS AMOUNT</b></TableCell>*/}
                    {/*                <TableCell className={"text-center"} ><b>FEES</b></TableCell>*/}
                    {/*                <TableCell className={"text-center"} ><b>NET AMOUNT</b></TableCell>*/}
                    {/*                <TableCell className={"text-center"} ><b>NOTES</b></TableCell>*/}
                    {/*            </TableRow>*/}
                    {/*        </TableHead>*/}
                    {/*        <TableBody>*/}
                    {/*            {transactions.map((row, index) => (*/}
                    {/*                <TableRow key={index}>*/}
                    {/*                    <TableCell className={" tableBorderStyle text-center p-2 "} style={{width:"0.1%"}}>{index + 1}</TableCell>*/}
                    {/*                    <TableCell  className={" tableBorderStyle text-center p-2 "} style={{width:"10%"}} >{row.date}</TableCell>*/}
                    {/*                    <TableCell className={"text-center tableBorderStyle"} style={{width:"10%"}}  >{row.action}</TableCell>*/}
                    {/*                    <TableCell className={"text-center tableBorderStyle"} style={{width:"10%"}} >{row.grossAmount}</TableCell>*/}
                    {/*                    <TableCell className={"text-center tableBorderStyle"} style={{width:"5%"}}  >{row.fees}</TableCell>*/}
                    {/*                    <TableCell className={"background_grey_color text-center tableBorderStyle"} style={{width:"10%"}} >{row.netAmount}</TableCell>*/}
                    {/*                    <TableCell className={"text-center tableBorderStyle"}style={{width:"25%"}} >{row.notes || ""}</TableCell>*/}
                    {/*                </TableRow>*/}
                    {/*            ))}*/}
                    {/*        </TableBody>*/}
                    {/*    </Table>*/}
                    {/*</TableContainer>*/}
                </div>

            </div>
        </div>
    );
};

