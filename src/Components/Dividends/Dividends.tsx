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

type Props = {
    
};
export const Dividends = (props: Props) => {
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Dividends");
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

                    <div className="col-xl-4 col-lg-6 col-md-7 col-sm-12">
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
                                            <td>Big Capital</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>100%</td>
                                        </tr>
                                        <tr>
                                            <td>Add Deposit</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>100%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Div. Received</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>100%</td>
                                        </tr>
                                        <tr>
                                            <td>Net Profit/Loss</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>100%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Withdrawal</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>100%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>End Capital</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>100%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Cash Balance</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                            <td>100%</td>
                                        </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>

                    {/*card2*/}
                    <div className="col-xl-4 col-lg-6 col-md-7 col-sm-12">
                        <div className="portfolio-card-container   position-relative    box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Symbol</th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Count</th>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Total Amount</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td>Total</td>
                                            <td>1</td>
                                            <td>$</td>
                                            <td>232,735</td>
                                        </tr>
                                        <tr className="">
                                            <td>X</td>
                                            <td>1</td>
                                            <td>$</td>
                                            <td>232,735</td>
                                        </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

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
                                    <div className=" ms-5 me-5 mt-5">
                                        <button className="circle-btn bg-light m-0"><i
                                            className="fa-solid fa-arrow-up icon-black icon-large-20"></i>
                                        </button>
                                        <button className="circle-btn bg-light m-0 mt-3"><i
                                            className="fa-solid fa-arrow-down icon-black icon-large-20"></i>
                                        </button>
                                    </div>
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


