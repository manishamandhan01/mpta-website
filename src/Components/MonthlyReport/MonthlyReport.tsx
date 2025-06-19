// @flow 
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";
import {MonthlyTradeRow, TradeRow, useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";
import {useState, useEffect} from "react";
import TradeReviewDataGrid from "@Components/DataGrid/TradeReviewDataGrid.tsx";
import MonthlyReportDataGrid from "@Components/DataGrid/MonthlyReportDataGrid.tsx";
import MonthlyEquityCurveChart from "@Components/Charts/MonthlyEquityCurveChart.tsx";
import MonthlyEquityCurveChartWithSummary from "@Components/Charts/MonthlyEquityCurveChartWithSummary.tsx";

type Props = {
    
};
export const MonthlyReport = (props: Props) => {
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Monthly Report");
    const [realizedProfit, setTotalGainPer] = React.useState<number>(7892);
    const [realizedLoss, setTotalLossPer] = React.useState<number>(794);
    const total = realizedProfit + realizedLoss;

    const {tradeRows, setFinalTradeRows, tradingSetting} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();
    const [filteredTradeRows, setFilteredTradeRows] = useState<MonthlyTradeRow[]>([]);
    const [filterApplied, setFilterApplied] = useState<boolean>(false);

    const profitPercentage = total ? (realizedProfit / total) * 100 : 0; // percentage of realized profit
    const lossPercentage = total ? (realizedLoss / total) * 100 : 0; //

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setFilteredTradeRows(json['monthly_report_data']);
                // setFilteredTradeRows(filteredTradeRows.slice(0, 15));
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        overAllPerformanceData();
    }, [tradeRows]);

    const handleTradeRowsChange = (rows: TradeRow[]) => {
        console.log("Updated trade rows from TradeDataGrid", rows);
        // setTradeRows(rows);
    };

   const monthlyChartOne= {
       chart: {
           width: 1200 ,
           height: 300 ,
       },
       title: {
           text: null
       },

       accessibility: {
           point: {
               valueDescriptionFormat:
                   '{xDescription}{separator}{value} million(s)'
           }
       },

       xAxis: {
           title: {
               text: 'Year'
           },
           categories: [1995, 2000, 2005, 2010, 2015, 2020, 2023]
       },

       yAxis: {
           type: 'logarithmic',
           title: {
               text: null
           }
       },

       tooltip: {
           headerFormat: '<b>{series.name}</b><br />',
           pointFormat: '{point.y} million(s)'
       },

       series: [{
           name: 'Internet Users',
           keys: ['y', 'color'],
           data: [
               [16, '#0000ff'],
               [361, '#8d0073'],
               [1018, '#ba0046'],
               [2025, '#d60028'],
               [3192, '#eb0014'],
               [4673, '#fb0004'],
               [5200, '#ff0000']
           ],
           color: {
               linearGradient: {
                   x1: 0,
                   x2: 0,
                   y1: 1,
                   y2: 0
               },
               stops: [
                   [0, '#0000ff'],
                   [1, '#ff0000']
               ]
           }
       }]
    };
    const monthlyChartTwo= {
        chart: {
            width: 600 ,
            height: 300 ,
        },
        title: {
            text: null
        },

        accessibility: {
            point: {
                valueDescriptionFormat:
                    '{xDescription}{separator}{value} million(s)'
            }
        },

        xAxis: {
            title: {
                text: 'Year'
            },
            categories: [1995, 2000, 2005, 2010, 2015, 2020, 2023]
        },

        yAxis: {
            type: 'logarithmic',
            title: {
                text: null
            }
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: '{point.y} million(s)'
        },

        series: [{
            name: 'Internet Users',
            keys: ['y', 'color'],
            data: [
                [16, '#0000ff'],
                [361, '#8d0073'],
                [1018, '#ba0046'],
                [2025, '#d60028'],
                [3192, '#eb0014'],
                [4673, '#fb0004'],
                [5200, '#ff0000']
            ],
            color: {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 1,
                    y2: 0
                },
                stops: [
                    [0, '#0000ff'],
                    [1, '#ff0000']
                ]
            }
        }]
    };

    return (
        <div className="" >
            <div className="pb-5 ">
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
                    <div className="bank-icon ">
                        <i className="fa-solid fa-arrow-trend-up"></i>
                    </div>
                    <p className="ps-2">Monthly Report</p>
                </div>

                <div className="row col-12 m-auto mt-2">
                    {/*CardOne*/}

                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative">
                            <div className="dashboard-overall-performance-card">
                                {/*<p>MONTHLY EQUITY CURVE</p>*/}
                                <div className="amounts mt-3    ">

                                    <div>
                                        {/*<HighchartsReact highcharts={Highcharts} options={monthlyChartOne}/>*/}
                                        <MonthlyEquityCurveChart
                                            equityData={filteredTradeRows.map(row => row.end_balance)}
                                            volumeData={filteredTradeRows.map(row => row.bank_transfer)}
                                            categories={filteredTradeRows.map(row => row.month)}
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/*card2*/}
                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative overflow-x-auto">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-3 d-flex flex-row    ">

                                    <div>
                                        {/*<HighchartsReact highcharts={Highcharts} options={monthlyChartTwo}/>*/}
                                        <MonthlyEquityCurveChartWithSummary
                                            thisPeriod={[10500, 15000, 12300, 16000, 8700, 9500, 13400, 14200, 11500, 10200, 9900, 12058]}
                                            previousPeriod={[15000, 17500, 14300, 17000, 11000, 10500, 14400, 16000, 12500, 13000, 12500, 13500]}
                                            thisPeriodLabel="Jan-19 to Dec-19"
                                            previousPeriodLabel="Jan-18 to Dec-18"
                                            currencySymbol="Php"
                                        />
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="amounts mt-4  d-flex flex-row">
                        <MonthlyReportDataGrid
                            filteredTradeRows={filteredTradeRows}
                        />
                    </div>


                </div>

            </div>
        </div>
    );
};

