// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import 'font-awesome/css/font-awesome.min.css';
import {OverAllPerformanceCard} from "@Components/Dashboard/OverAllPerformanceCard.tsx";
import {DasboardPnlGraph} from "@Components/Dashboard/DasboardPNLGraph.tsx";
import {DasboardAccountSummary} from "@Components/Dashboard/DasboardAccountSummary.tsx";
import {DistributionGainLossBar} from "@Components/Dashboard/DistributionGainLossBar.tsx";
import {OverAllTradeStatisticsCard} from "@Components/Dashboard/OverAllTradeStatisticsCard.tsx";
import {PerformancePerRecord} from "@Components/Dashboard/PerformancePerRecord.tsx";
import {TradeStatistics} from "@Components/Dashboard/TradeStatistics.tsx";
import {PerformanceCurve} from "@Components/Dashboard/PerformanceCurve.tsx";
import {WeeklyPerformanceCurve} from "@Components/Dashboard/WeeklyPerformanceCurve.tsx";
import {DrawnAndLosingStreak} from "@Components/Dashboard/DrawnAndLosingStreak.tsx";
import {RequiredWinRate} from "@Components/Dashboard/RequiredWinRate.tsx";
import {useLocation} from "react-router-dom";

type Props = {};

export const Dashboard = (props: Props) => {

    return (
        <div>
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
            <div className="dashboard-top_item pe-5 ps-5 row ">
                <div className="dashboard-header col-xl-3 col-lg-6 col-md-6 col-sm-12 ">
                    <img src="/public/06-removebg-preview.png" alt="Logo" className="dashboard-image"/>
                    <h1 className="dashboard-title">Trading Journal</h1>
                </div>

                <div className="dashboard-details-main col-xl-6 col-lg-12 col-md-12 col-sm-12 ">
                    <div className="dashboard-details ">
                        <div><p className={"font_Epilogue heading-16 font_weight_500 total_gain_row"}>$ 4005890.50</p>
                        </div>
                        <div><h1 className="font_poppins heading-16">BEG. BALANCE</h1></div>

                    </div>
                    <div className="dashboard-details ">
                        <p className={"font_Epilogue heading-16 font_weight_500 total_gain_row"}>$ 4005890.50</p>
                        <h1 className="font_poppins heading-16">NET PROFIT & DIVIDEND</h1>
                    </div>
                    <div className="dashboard-details ">
                        <p className={"font_Epilogue heading-16 font_weight_500 total_loss_row"}>$ 4005890.50</p>
                        <h1 className="font_poppins heading-16">WITHDRAWALS</h1>
                    </div>
                    <div className="dashboard-details ">
                        <p className={"font_Epilogue heading-16 font_weight_500 total_gain_row"}>$ 4005890.50</p>
                        <h1 className="font_poppins heading-16">END BALANCE</h1>
                    </div>
                    <div className="dashboard-details ">
                        <p className={"font_Epilogue heading-16 font_weight_500 total_loss_row"}>$ 4005890.50</p>
                        <h1 className="font_poppins heading-16">CASH BALANCE</h1>
                    </div>

                </div>
                <div className="dashboard-side-icons  col-xl-3 col-lg-6 col-md-6 col-sm-12 ">


                    <div className="">
                        <i className="fa-solid fa-arrows-rotate heading-24"></i>
                    </div>
                    <div className="bank-icon ">
                        {/*<i className="fa-solid fa-house heading-24"></i>*/}
                        <img src="/public/bank.png" />                    </div>
                    <div className=" ">
                        <i className="fa-solid fa-list-ul heading-24"></i>
                    </div>
                    <div className=" ">
                        <i className="fa-solid fa-hand-holding-dollar heading-24"></i>
                    </div>
                    <div className=" ">
                        <i className="fa-solid fa-gear heading-24"></i>
                    </div>

                </div>
            </div>
            <hr/>

            <div className="dashboard-container">
                Overall summary

            </div>
            <div className="row col-12 m-auto mt-2">

                <OverAllPerformanceCard/>
                <DistributionGainLossBar/>

                <OverAllTradeStatisticsCard/>

            </div>
            <div className="dashboard-container mt-3">
                Analytics

            </div>
            <div className="row col-12 m-auto mt-2">

                <DrawnAndLosingStreak/>
                <TradeStatistics/>

                <RequiredWinRate/>

            </div>
            <div className="dashboard-container mt-3">
                Performance summary

            </div>
            <div className="row col-12 m-auto mt-3">
                <PerformancePerRecord/>
                <PerformanceCurve/>
                <WeeklyPerformanceCurve/>

            </div>

            {/*<div>*/}
            {/*    <DasboardAccountSummary/>*/}
            {/*</div>*/}

        </div>

    );
};