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
import {fetchTradeResults, TradeRow, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type Props = {

};
export const TradeLog = (props: Props) => {

    const {tradeRows, setTradeRows} = useGlobalStore();

    const [topStockPositionsByAllocation, setTopStockPositionsByAllocation] = useState([]);

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults(tradeRows)
            .then(json => {
                setTopStockPositionsByAllocation(json['top_5_stock_positions_by_allocation']);
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
            text: 'Portfolio'
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
                { name: 'Allocation', y: 74 },
                { name: 'Cash', y: 12 },
            ]
        }]
    };
    return (
        <div className="pb-5" >
            {/*heading*/}
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
            <div className="">
                <div className="d-flex align-items-center ms-4 p-3">
                    <i className="fa-solid fa-address-card heading-24 "></i>
                    <p className="ps-2">Trade Log</p>
                </div>

                <div className="row col-12 m-auto mt-2">
                    {/*CardOne*/}

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2" style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue" colSpan={3} style={{fontSize: '15px'}}>Account
                                                Name
                                            </th>
                                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Manisha</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td>Beg. Capital</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>52%</td>
                                        </tr>
                                        <tr>
                                            <td>Add deposit</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>52%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Div. Received</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>52%</td>
                                        </tr>
                                        <tr>
                                            <td>Net Profit/Loss</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>52%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Withdrawals</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>52%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>End Capital</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>52%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Cash Balance</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>52%</td>
                                        </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>

                    {/*card2*/}
                    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-12">
                        <div className="portfolio-card-container   position-relative    box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Top Five Stock
                                                Position By Allocation
                                            </th>

                                        </tr>
                                        </thead>
                                        <thead>
                                        <tr>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Weight%</th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Stock Code</th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Ave.Price</th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Total Shares</th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Amount</th>

                                        </tr>

                                        </thead>


                                        <tbody>
                                        {topStockPositionsByAllocation?.length > 0 ? (
                                            topStockPositionsByAllocation.map((stock, index) => (
                                                <tr className="background_grey_color" key={index}>
                                                    <td>{stock['weight_percentage'] ?? 'N/A'}</td>
                                                    <td>{stock['symbol'] ?? 'N/A'}</td>
                                                    <td>{stock['average_price'] ?? 'N/A'}</td>
                                                    <td>{stock['total_shares'] ?? 'N/A'}</td>
                                                    <td>{stock['amount'] ?? 'N/A'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5}>Loading or No Data</td>
                                            </tr>
                                        )}

                                        {/*<tr className="background_grey_color">*/}
                                        {/*    <td>{topStockPositionsByAllocation?.[0]?.['weight%'] ?? 'N/A'}</td>*/}
                                        {/*    /!*<td>21</td>*!/*/}
                                        {/*    <td>BILL</td>*/}
                                        {/*    <td>232,735</td>*/}
                                        {/*    <td>232</td>*/}
                                        {/*    <td>14200</td>*/}
                                        {/*</tr>*/}

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*card3*/}

                    <div className="col-xl-2 col-lg-6 col-md-5 col-sm-12">
                        <div className="portfolio-card-container   position-relative    box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>SL & TP
                                                Calculator
                                            </th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}><i
                                                className="fa-solid fa-gear heading-24 "></i></th>

                                        </tr>
                                        </thead>
                                        <thead>
                                        <tr>
                                            <th className="font_Epilogue text-center" style={{fontSize: '15px'}}>Stop
                                                Loss
                                            </th>
                                            <th className="font_Epilogue text-center " style={{fontSize: '15px'}}>Target
                                                Price
                                            </th>

                                        </tr>

                                        </thead>


                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>
                                        <tr className="">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>
                                        <tr className="">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Card4*/}
                    <div className="col-xl-3  col-lg-6 col-md-5 col-sm-12">
                        <div className="portfolio-card-container position-relative box-12 overflow-x-auto">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts d-flex flex-row align-items-center">
                                    <div id="overAllPerformanceChart" className="">
                                        <HighchartsReact highcharts={Highcharts} options={tradeLogChart}/>

                                    </div>
                                    <div className=" ">
                                        <button className="circle-btn bg-light "><i
                                            className="fa-solid fa-arrow-up icon-black icon-large-20"></i>
                                        </button>
                                        <button className="circle-btn bg-light mt-3"><i
                                            className="fa-solid fa-arrow-down icon-black icon-large-20"></i>
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                </div>

                <div className="amounts mt-4 ms-3 me-3 d-flex flex-row">
                    <TradeDataGrid onRowsChange={handleTradeRowsChange}/>
                </div>

                </div>
            </div>
            );
            };

