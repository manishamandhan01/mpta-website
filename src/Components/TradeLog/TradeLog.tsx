// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import {OverAllPerformanceCard} from "@Components/Dashboard/OverAllPerformanceCard.tsx";
import {DistributionGainLossBar} from "@Components/Dashboard/DistributionGainLossBar.tsx";
import {OverAllTradeStatisticsCard} from "@Components/Dashboard/OverAllTradeStatisticsCard.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import TradeDataGrid from "@Components/DataGrid/DataGrid.tsx";
import {useEffect, useState} from "react";
import {useTradeResults, TradeRow, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";
import CapitalCalculationsCard from "@Components/Widgets/CapitalCalculationCard.tsx";
import SLTPCalculatorCard from "@Components/Widgets/SLTPCalculatorCard.tsx";

type Props = {

};
export const TradeLog = (props: Props) => {

    const {tradeRows, setFinalTradeRows} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();


    const [topStockPositionsByAllocation, setTopStockPositionsByAllocation] = useState([]);
    const [capitalCalculations, setCapitalCalculations] = useState([]);
    const [cashAllocationPercent, setCashAllocationPercent] = useState<number>(0);
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Trade Log");

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setTopStockPositionsByAllocation(json['top_5_stock_positions_by_allocation']);
                setCapitalCalculations(json['capital_calculations']);
                setFinalTradeRows(json['trade_log_result_data']);
                const cashRow = (json['capital_calculations'] as { label: string; percentage: number }[])
                    .find((row) => row.label === 'Cash Balance');
                setCashAllocationPercent(cashRow ? cashRow['percentage'] : 0);
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
    // Data retrieved from https://netmarketshare.com/
    // Make monochrome colors
    const colors = Highcharts.getOptions().colors.map((c, i) =>
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        Highcharts.color(Highcharts.getOptions().colors[0])
            .brighten((i - 3) / 7)
            .get()
    );

    const tradeLogChart = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 400,  // Decrease the width of the chart
            height: 300  //
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderRadius: 5,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        series: [{
            name: 'Share',
            data: [
                { name: 'Allocation', y: 100 - cashAllocationPercent },
                { name: 'Cash', y: cashAllocationPercent },
            ]
        }]
    };
    return (
        <div className="pb-5">
            <div className=" ">
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


                <div className="row col-12  main-trade-log-cards m-auto mt-5 ">
                    {/*CardOne*/}

                    <CapitalCalculationsCard
                        capitalCalculations={capitalCalculations}
                    />

                    {/*card2*/}
                    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-12">
                        <div className="   position-relative ms-0    box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue heading-16 font_weight_400 line_height_32"
                                                style={{fontSize: '15px'}}>Top Five Stock
                                                Position By Allocation
                                            </th>

                                        </tr>
                                        </thead>
                                        <thead>
                                        <tr>
                                            <th className="font_Epilogue  font_weight_500"
                                                style={{fontSize: '15px'}}>Weight%
                                            </th>
                                            <th className="font_Epilogue font_weight_500 "
                                                style={{fontSize: '15px'}}>Stock Code
                                            </th>
                                            <th className="font_Epilogue font_weight_500"
                                                style={{fontSize: '15px'}}>Ave.Price
                                            </th>
                                            <th className="font_Epilogue font_weight_500"
                                                style={{fontSize: '15px'}}>Total Shares
                                            </th>
                                            <th className="font_Epilogue font_weight_500"
                                                style={{fontSize: '15px'}}>Amount
                                            </th>

                                        </tr>

                                        </thead>


                                        <tbody>
                                        {topStockPositionsByAllocation?.length > 0 ? (
                                            topStockPositionsByAllocation.map((stock, index) => (
                                                <tr
                                                    key={index}
                                                    className={`${index % 2 === 0 ? 'background_grey_color' : ''}`}
                                                    style={{
                                                        paddingTop: '5px',
                                                        paddingBottom: '5px',
                                                    }} // Add height or padding
                                                >
                                                    <td className="py-1">{stock['weight_percentage'] ?? 'N/A'}</td>
                                                    <td className="py-1">{stock['symbol'] ?? 'N/A'}</td>
                                                    <td className="py-1">{stock['average_price'] ?? 'N/A'}</td>
                                                    <td className="py-1">{stock['total_shares'] ?? 'N/A'}</td>
                                                    <td className="py-1">{stock['amount'] ?? 'N/A'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-center py-3">Loading or No Data</td>
                                            </tr>
                                        )}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*card3*/}

                    <SLTPCalculatorCard positions={topStockPositionsByAllocation} />
                    {/*Card4*/}
                    <div className="col-xl-3  col-lg-6 col-md-5 col-sm-12">
                        <div className=" position-relative ms-0 box-12 overflow-x-auto">
                            <div className="dashboard-overall-performance-card">
                                <div className="font_Epilogue heading-16 font_weight_400 line_height_32">
                                   Portfolio
                                </div>
                                <div className="amounts d-flex  align-items-center">
                                    <div id="overAllPerformanceChart" className="d-flex align-items-center">
                                        <HighchartsReact highcharts={Highcharts} options={tradeLogChart}/>
                                        <div className="">
                                            <button className="circle-btn bg-light m-0 "><i
                                                className="fa-solid fa-arrow-up icon-black icon-large-20"></i>
                                            </button>
                                            <button className="circle-btn bg-light mt-3 m-0"><i
                                                className="fa-solid fa-arrow-down icon-black icon-large-20"></i>
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="amounts mt-4  d-flex flex-row">
                        <TradeDataGrid onRowsChange={handleTradeRowsChange}/>
                    </div>
                </div>


            </div>
        </div>
    );
};

