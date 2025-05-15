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
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";
import {useEffect, useState} from "react";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";
import OverallProfitLossCard from "@Components/Widgets/OverallProfitLossCard.tsx";
import BankTransferSummaryCard, {BankTransferCumulatives} from "@Components/Widgets/BankTransferSummaryCard.tsx";

type Props = {};


//
// export const transactions: BankTransferModel[] = [
//     { date: "9/3/2017", action: "Deposit", grossAmount: "$100,000", fees: "", netAmount: "$100,000" },
//     { date: "1/1/2018", action: "Deposit", grossAmount: "$100,000", fees: "", netAmount: "$100,000" },
//     { date: "5/1/2019", action: "Deposit", grossAmount: "$100,000", fees: "", netAmount: "$100,000" },
//     { date: "12/1/2019", action: "Withdraw", grossAmount: "$50,000", fees: "", netAmount: "-$50,000" },
//     { date: "12/3/2019", action: "Deposit", grossAmount: "$10,000", fees: "", netAmount: "$10,000" },
// ];
export const BankTransfer = (props: Props) => {
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Bank Transfer");

    const {bankTransferRows, setBankTransferRows} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();
    const [bankTransferCumulatives, setBankTransferCumulatives] = useState<BankTransferCumulatives | null>();
    const [plData, setPlData] = React.useState([]);

    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setBankTransferCumulatives(json?.bank_transfer_cumulatives || null);
                setPlData(json?.overall_profit_loss_card_data || []);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        overAllPerformanceData();
    }, [bankTransferRows]);


    return (
        <div className="pb-5">
            <DashboardHeader/>
            <div>
                <div className="ua_top_item">
                    <ul>
                        {DashboardData.map((item, index: number) => {
                            const isActive = activeLabel === item.label;

                            return (
                                <li key={index}>
                                    <a
                                        href={item.label}
                                        className={`text_gray font_weight_300 font_poppins line_height_20 heading_24 ${
                                            isActive ? "active-tab" : ""
                                        }`}
                                        onClick={() => setActiveLabel(item.label)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="">


                <div className="row col-12 main-trade-log-cards m-auto mt-5 ">
                    {/*CardOne*/}

                    <OverallProfitLossCard data={plData} profitPercentage={60} lossPercentage={40} />

                    {/*card2*/}
                    {/*<div className="col-xl-8 col-md-7 col-sm-12">*/}
                    {/*    <div className="   position-relative   ms-0 box-12">*/}
                    {/*        <div className="dashboard-overall-performance-card">*/}
                    {/*            <div className="d-flex justify-content-between text-center mw-50 m-auto ">*/}
                    {/*                <div><p>PREVIOUS CUMULATIVE</p><p>NOV-19</p></div>*/}
                    {/*                <div><p>THIS PERIOD</p><p>NOV-19</p></div>*/}
                    {/*                <div><p> CUMULATIVE</p><p>NOV-19</p></div>*/}

                    {/*            </div>*/}

                    {/*            <div className="amounts mt-4 d-flex flex-row">*/}
                    {/*                <table className="table mt-2" style={{borderCollapse: 'collapse'}}>*/}
                    {/*                    <thead>*/}
                    {/*                    <tr>*/}
                    {/*                        <th className="font_Epilogue " style={{fontSize: '15px'}}></th>*/}
                    {/*                        <th className="font_Epilogue " style={{fontSize: '15px'}}></th>*/}
                    {/*                        <th className="font_Epilogue " style={{fontSize: '15px'}}></th>*/}
                    {/*                        <th className="font_Epilogue " style={{fontSize: '15px'}}></th>*/}
                    {/*                    </tr>*/}
                    {/*                    </thead>*/}
                    {/*                    <tbody>*/}
                    {/*                    {bankTransferCumulatives?.length > 0 ? (*/}
                    {/*                        bankTransferCumulatives.map((stock, index) => (*/}
                    {/*                            <tr className="background_grey_color" key={index}>*/}
                    {/*                                <td>{stock['deposit'] ?? 'N/A'}</td>*/}

                    {/*                            </tr>*/}
                    {/*                        ))*/}
                    {/*                    ) : (*/}
                    {/*                        <tr>*/}
                    {/*                            <td colSpan={5}>Loading or No Data</td>*/}
                    {/*                        </tr>*/}
                    {/*                    )}*/}

                    {/*                    </tbody>*/}
                    {/*                </table>*/}
                    {/*                <div className=" ms-5 me-5">*/}
                    {/*                    <button className="circle-btn bg-light m-0"><i*/}
                    {/*                        className="fa-solid fa-arrow-up icon-black icon-large-20"></i>*/}
                    {/*                    </button>*/}
                    {/*                    <button className="circle-btn bg-light m-0 mt-3"><i*/}
                    {/*                        className="fa-solid fa-arrow-down icon-black icon-large-20"></i>*/}
                    {/*                    </button>*/}
                    {/*                </div>*/}

                    {/*            </div>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*</div>*/}

                    <BankTransferSummaryCard bank_transfer_cumulatives={bankTransferCumulatives} />
                    <div className="amounts mt-4  d-flex flex-row">
                        <BankTransferDataGrid/>

                    </div>


                </div>


            </div>
        </div>
    );
};

