import * as React from 'react';
import { DashboardData } from "@Components/Dashboard/DashboardData.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";
import DividendDataGrid from "@Components/DataGrid/DividendDataGrid.tsx";
import StockPositionDataGrid from "@Components/DataGrid/StockPositionDataGrid.tsx";
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";

import {useEffect, useState} from "react";

type Props = {};

export const StockPosition = (props: Props) => {
   const[activeLabel, setActiveLabel] = React.useState<string | null>("Stock Position");
   const StockPositionData=[
       {
           "name": "CAN",
           "profit": "2564",
           "tradeWin": "2(0.1%)",
           "winRate": "20%",
           "averagedays": "5",
           "averageAllocation": "16.5%",
           "averageWin": "12%",
           "averageLoss": "32.1%"
       },
       {
           "name": "AAPL",
           "profit": "3500",
           "tradeWin": "15(2.5%)",
           "winRate": "60%",
           "averagedays": "3",
           "averageAllocation": "18%",
           "averageWin": "8%",
           "averageLoss": "20%"
       },
       {
           "name": "TSLA",
           "profit": "2750",
           "tradeWin": "10(1.2%)",
           "winRate": "40%",
           "averagedays": "7",
           "averageAllocation": "12%",
           "averageWin": "15%",
           "averageLoss": "25%"
       },
       {
           "name": "GOOG",
           "profit": "1800",
           "tradeWin": "8(1.0%)",
           "winRate": "50%",
           "averagedays": "4",
           "averageAllocation": "14%",
           "averageWin": "10%",
           "averageLoss": "18%"
       },
       {
           "name": "AMZN",
           "profit": "4200",
           "tradeWin": "18(3.0%)",
           "winRate": "70%",
           "averagedays": "2",
           "averageAllocation": "20%",
           "averageWin": "10%",
           "averageLoss": "15%"
       },
       {
           "name": "MSFT",
           "profit": "3100",
           "tradeWin": "12(1.8%)",
           "winRate": "55%",
           "averagedays": "6",
           "averageAllocation": "17%",
           "averageWin": "9%",
           "averageLoss": "22%"
       }
   ]
   const { fetchTradeResults } = useTradeResults();
   const {tradeRows, setTradeRows} = useGlobalStore();

   const [topSymbols, setTopSymbols] = useState([]);

    // const topSymbols = [
    //     { id: 1, symbol: 'PXP', cumulative: 'Php 50,452', trades: 16, winRate: '56.25%', profitFactor: '4.12', expectancy: 'Php 3,153' },
    //     { id: 2, symbol: 'NOW', cumulative: 'Php 34,531', trades: 3, winRate: '33.33%', profitFactor: '4.71', expectancy: 'Php 11,510' },
    //     // ...
    // ];

    const [worstSymbols, setWorstSymbols] = useState([]);

    // const worstSymbols = [
    //     { id: 1, symbol: 'NIKL', cumulative: 'Php -16,329', trades: 6, winRate: '0.00%', profitFactor: 'NA', expectancy: 'NA' },
    //     { id: 2, symbol: 'PRMX', cumulative: 'Php -6,959', trades: 3, winRate: '0.00%', profitFactor: 'NA', expectancy: 'NA' },
    //     // ...
    // ];

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setTopSymbols(json['top_symbols']);
                setWorstSymbols(json['worst_symbols']);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        overAllPerformanceData();
    }, [tradeRows]);


    const statisticChart = {
        chart: {
            type: 'pie',
            custom: {},
            events: {
                render() {
                    const chart = this;
                    const series = chart.series[0];
                    let customLabel = chart.options.chart.custom.label;

                    if (!customLabel) {
                        customLabel = chart.options.chart.custom.label =
                            chart.renderer.label(

                                    '<strong>51</strong>'+
                                '<br/>Trade Symbol'
                            )
                                .css({
                                    color: '#000',
                                    textAnchor: 'middle',
                                })
                                .add();
                    }

                    const x = series.center[0] + chart.plotLeft,
                        y = series.center[1] + chart.plotTop -
                            customLabel.attr('height') / 2;

                    customLabel.attr({
                        x,
                        y,
                    });

                    customLabel.css({
                        fontSize: `${series.center[2] / 12}px`,
                    });
                },
            },
        },
        accessibility: {
            point: {
                valueSuffix: '%',
            },
        },
        title: {
            text: 'Summary',
        },
        subtitle: {
            text: null,
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.0f}%</b>',
        },
        legend: {
            enabled: false,
        },
        plotOptions: {
            series: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderRadius: 8,
                dataLabels: [
                    {
                        enabled: true,
                        distance: 20,
                        format: '{point.name}',
                    },
                    {
                        enabled: true,
                        distance: -15,
                        format: '{point.percentage:.0f}%',
                        style: {
                            fontSize: '0.9em',
                        },
                    },
                ],
                showInLegend: true,
            },
        },
        series: [
            {
                name: 'Registrations',
                colorByPoint: true,
                innerSize: '77%',
                data: [
                    {
                        name: 'Profitable',
                        y: 77,
                        color:"#28a745",
                        dataLabels: {
                            style: {
                                fontSize: '16px', // Increased font size for 'Profitable'
                            },
                        },
                    },
                    {
                        name: 'Non-Profitable',
                        y: 23,
                        color: '#ff0000',
                        dataLabels: {
                            style: {
                                fontSize: '16px', // Increased font size for 'Profitable'
                            },
                        },
                    },

                ],
            },
        ],
    };

    return (
        <div >
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
                    <div className="bank-icon">
                        <i className="fa-solid fa-chart-column heading-24"></i>
                    </div>
                    <p className="ps-2">Statistics</p>
                </div>

                <div className="row col-12 m-auto mt-2">
                    {/* CardOne */}
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative">
                            <div id="overAllPerformanceChart" className="mt-1">
                                {/* Rendering the Highcharts pie chart here */}
                                <HighchartsReact highcharts={Highcharts} options={statisticChart}/>
                            </div>
                        </div>
                    </div>

                    {/* card2 */}
                    <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12 ">
                        <div className="portfolio-card-container position-relative box-12  overflow-x-auto">
                            <div className="dashboard-overall-performance-card">
                                <div className="d-flex justify-content-between text-center  m-auto ">
                                    <div className="d-flex flex-row ">
                                        <p className="heading-20 ">Sort </p>
                                        <p className="heading-20 ms-2">Symbol </p>

                                        <select className="ms-3">
                                            <option>Most Trades</option>
                                            <option>Top Trades</option>
                                            <option>Worst Trades</option>
                                        </select>
                                    </div>

                                </div>

                                <div className="amounts mt-4  mr-82 d-flex flex-row  ">
                                    <table className="table mt-2" style={{borderCollapse: 'collapse'}}>
                                        <thead>
                                        <tr>
                                            <th className="  heading-20 font_Epilogue font_weight_400 mb-4 text-center  ">Stock
                                                Code
                                            </th>
                                            <th className="heading-20 font_Epilogue font_weight_400 mb-4 text-center">Profit</th>
                                            <th className="heading-20 font_Epilogue font_weight_400 mb-4 text-center">Trade(Win%)</th>
                                            <th className="heading-20 font_Epilogue font_weight_400 mb-4 text-center">Win
                                                Rate %
                                            </th>
                                            <th className="heading-20 font_Epilogue font_weight_400 mb-4 text-center ">Average
                                                Days
                                            </th>
                                            <th className="heading-20 font_Epilogue font_weight_400 mb-4 text-center ">Average
                                                Allocation
                                            </th>
                                            <th className="heading-20 font_Epilogue font_weight_400 mb-4 text-center">Average
                                                Win%
                                            </th>
                                            <th className="heading-20 font_Epilogue font_weight_400 mb-4 text-center">Average
                                                Loss%
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody>

                                        {StockPositionData.map((item, index: number) => {
                                            return (
                                                <tr className="table-row-padding text-center">
                                                    <td>{item.name}</td>
                                                    <td>{item.profit}</td>
                                                    <td>{item.tradeWin}</td>
                                                    <td>{item.winRate}</td>
                                                    <td>{item.averagedays}</td>
                                                    <td>{item.averageAllocation}</td>
                                                    <td>{item.averageWin}</td>
                                                    <td>{item.averageLoss}</td>
                                                </tr>

                                            )

                                        })}


                                        </tbody>
                                    </table>
                                    <div className=" ms-5 me-5">
                                        <button className="circle-btn bg-light mt-5">
                                            <i className="fa-solid fa-arrow-up icon-black icon-large-20"></i>
                                        </button>
                                        <button className="circle-btn bg-light  mt-5">
                                            <i className="fa-solid fa-arrow-down icon-black icon-large-20"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="amounts mt-4 ms-3 me-3 d-flex flex-row">
                    <StockPositionDataGrid topSymbols={topSymbols} worstSymbols={worstSymbols} />
                </div>
            </div>
        </div>
    );
};
