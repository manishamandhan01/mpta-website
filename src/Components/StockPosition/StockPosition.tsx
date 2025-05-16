import * as React from 'react';
import { DashboardData } from "@Components/Dashboard/DashboardData.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";
import DividendDataGrid from "@Components/DataGrid/DividendDataGrid.tsx";
import StockPositionDataGrid from "@Components/DataGrid/StockPositionDataGrid.tsx";
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";

import {useEffect, useState} from "react";
import SummaryPieChart from "@Components/StockPosition/SummaryPieChart.tsx";
import StockPerformanceTableCard from "@Components/Widgets/StockPerformanceTableCard.tsx";

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

   const [sortOption, setSortOption] = useState<'Most Trades' | 'Top Trades' | 'Worst Trades'>('Most Trades');


   const [topSymbols, setTopSymbols] = useState([]);
   const [mostSymbols, setMostSymbols] = useState([]);

    // Determine which data to show
    const getCurrentData = () => {
        if (sortOption === 'Top Trades') return topSymbols.slice(0,5);
        if (sortOption === 'Most Trades') return topSymbols.slice(0,5);
        if (sortOption === 'Worst Trades') return worstSymbols.slice(0,5);
        return mostSymbols;
    };

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
                setMostSymbols(json['top_symbols']);
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


                <div className="row col-12 m-auto mt-2">
                    {/* CardOne */}
                    <div className="col-xl-4 col-lg-12 col-md-12 col-sm-12">
                        <div className="portfolio-card-container dashboard-overall-performance-card ms-5 position-relative">
                            <div id="overAllPerformanceChart" className="mt-1">
                                {/* Rendering the Highcharts pie chart here */}
                                {/*<HighchartsReact highcharts={Highcharts} options={statisticChart}/>*/}
                                <SummaryPieChart profitableCount={topSymbols.length} nonProfitableCount={worstSymbols.length} />
                            </div>
                        </div>
                    </div>

                    {/* card2 */}
                    <StockPerformanceTableCard
                        stockData={getCurrentData()}
                        sortOption={sortOption}
                        setSortOption={setSortOption}
                    />
                </div>
                <div className="amounts mt-4 ms-3 me-3 d-flex flex-row">
                    <StockPositionDataGrid topSymbols={topSymbols} worstSymbols={worstSymbols} />
                </div>
            </div>
        </div>
    );
};
