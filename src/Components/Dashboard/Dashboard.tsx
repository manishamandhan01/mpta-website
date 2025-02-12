// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import 'font-awesome/css/font-awesome.min.css';
import {OverAllPerformanceCard} from "@Components/Dashboard/OverAllPerformanceCard.tsx";
import {DasboardPnlGraph} from "@Components/Dashboard/DasboardPNLGraph.tsx";
import {DasboardAccountSummary} from "@Components/Dashboard/DasboardAccountSummary.tsx";
import {GainLossBar} from "@Components/Dashboard/GainLossBar.tsx";
import {OverAllTradeStatisticsCard} from "@Components/Dashboard/OverAllTradeStatisticsCard.tsx";
import {PerformancePerRecord} from "@Components/Dashboard/PerformancePerRecord.tsx";

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
                Dashboard

            </div>
            <div className="row col-12 m-auto">

                <OverAllPerformanceCard/>
                    <GainLossBar/>

                <OverAllTradeStatisticsCard/>

            </div>

            <div className="row col-12 m-auto mt-5">
                <PerformancePerRecord/>
                <GainLossBar/>

            </div>
            {/*<div>*/}
            {/*    <DasboardAccountSummary/>*/}
            {/*</div>*/}

        </div>

    );
};