// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import 'font-awesome/css/font-awesome.min.css';
import {DashboardCard} from "@Components/Dashboard/DashboardCard.tsx";
import {DasboardPnlGraph} from "@Components/Dashboard/DasboardPNLGraph.tsx";
import {DasboardAccountSummary} from "@Components/Dashboard/DasboardAccountSummary.tsx";

type Props = {};

export const Dashboard = (props: Props) => {
    return (
        <div>
        <div className="">
            <div className="ua_top_item">
                <ul>
                    {DashboardData.map((item: DashboardData, index: number) => {
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
            <div className="dashboard-card_main">
                <DashboardCard/>
                <DashboardCard/>
                <DashboardCard/>
                <DashboardCard/>

            </div>

            <div>
                <DasboardPnlGraph/>
            </div>
            <div>
                <DasboardAccountSummary/>
            </div>

        </div>

    );
};
