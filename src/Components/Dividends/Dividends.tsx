// @flow 
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import {OverAllPerformanceCard} from "@Components/Dashboard/OverAllPerformanceCard.tsx";
import {DistributionGainLossBar} from "@Components/Dashboard/DistributionGainLossBar.tsx";
import {OverAllTradeStatisticsCard} from "@Components/Dashboard/OverAllTradeStatisticsCard.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import BankTransferDataGrid from "@Components/DataGrid/BankTransferDataGrid.tsx";
import DividendDataGrid from "@Components/DataGrid/DividendDataGrid.tsx";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";
import CapitalCalculationsCard from "@Components/Widgets/CapitalCalculationCard.tsx";
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";
import {useEffect, useState} from "react";
import DividendCumulativesCard from "@Components/Widgets/DividendCumulativesCard.tsx";

type Props = {
    
};
export const Dividends = (props: Props) => {
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Dividends");
    const {tradeRows} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();


    const [capitalCalculations, setCapitalCalculations] = useState([]);
    const [dividendCumulatives, setDividendCumulatives] = useState([]);

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setCapitalCalculations(json['capital_calculations']);
                setDividendCumulatives(json['dividend_cumulatives']);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        overAllPerformanceData();
    }, [tradeRows]);
    return (
        <div  >
            <div className="pb-5">
                <DashboardHeader/>
            </div>
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
                <div className="d-flex align-items-center ms-4 p-3">
                    <i className="fa-solid fa-hand-holding-dollar heading-24 "></i>
                    <p className="ps-2">Dividends</p>
                </div>

                <div className="row col-12 m-auto mt-2">
                    {/*CardOne*/}

                    <CapitalCalculationsCard
                        capitalCalculations={capitalCalculations}
                        accountName="Sam"
                    />

                    {/*card2*/}
                    <DividendCumulativesCard data={dividendCumulatives} />

                    {/*Card4*/}
                    <div className="col-xl-4  col-lg-6 col-md-7 col-sm-12">
                        <div className="portfolio-card-container position-relative box-12 overflow-x-auto">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-2 d-flex flex-row">
                                    <div>
                                        <p>Note:</p>
                                        <p>For Stock Dividend or Stock Split received,</p>
                                        <p>Enter the data in the "Trade Log" sheet without the stock price.</p>
                                        <p>Example:</p>
                                        <p>Date| Stock Code|Buy|Price Leave Blank|Shares Received</p>
                                        <p>Stock Shares and average price will be adjusted accordingly.</p>
                                    </div>
                                    {/*<div className=" ms-5 me-5 mt-5">*/}
                                    {/*    <button className="circle-btn bg-light m-0"><i*/}
                                    {/*        className="fa-solid fa-arrow-up icon-black icon-large-20"></i>*/}
                                    {/*    </button>*/}
                                    {/*    <button className="circle-btn bg-light m-0 mt-3"><i*/}
                                    {/*        className="fa-solid fa-arrow-down icon-black icon-large-20"></i>*/}
                                    {/*    </button>*/}
                                    {/*</div>*/}
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="amounts mt-4 ms-3 me-3 d-flex flex-row">
                    <DividendDataGrid/>
                </div>

                </div>
            </div>
            );
            };


