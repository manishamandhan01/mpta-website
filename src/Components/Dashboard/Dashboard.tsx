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
                                    <span>{item.label}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="dashboard-container">
                Overall summary

            </div>
            <div className="row col-12 m-auto mt-2">

                <OverAllPerformanceCard/>
                <DistributionGainLossBar/>

                <OverAllTradeStatisticsCard/>

            </div>
            <div className="dashboard-container mt-3">
                Performance summary

            </div>
            <div className="row col-12 m-auto mt-3">
                <PerformancePerRecord/>
                <PerformanceCurve/>
                <WeeklyPerformanceCurve/>

            </div>
            <div className="dashboard-container mt-3">
               Analytics

            </div>
            <div className="row col-12 m-auto mt-2">

                <DrawnAndLosingStreak/>
                <TradeStatistics/>

                <RequiredWinRate/>

            </div>
            {/*<div>*/}
            {/*    <DasboardAccountSummary/>*/}
            {/*</div>*/}

        </div>

    );
};