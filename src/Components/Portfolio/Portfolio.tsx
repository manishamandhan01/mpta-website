// @flow 
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import {OverAllPerformanceCard} from "@Components/Dashboard/OverAllPerformanceCard.tsx";
import {DistributionGainLossBar} from "@Components/Dashboard/DistributionGainLossBar.tsx";
import {OverAllTradeStatisticsCard} from "@Components/Dashboard/OverAllTradeStatisticsCard.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

type Props = {
    
};
export const Portfolio = (props: Props) => {
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Portfolio");
    return (
        <div className="pb-5" >
            {/*heading*/}
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

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
                        <div className=" box-12 ms-0 position-relative">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2" style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue" colSpan={3} style={{fontSize: '15px'}} >Account Name</th>
                                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Manisha</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td>End Capital</td>
                                            <td>$</td>
                                            <td>5,214,700</td>
                                        </tr>
                                        <tr>
                                            <td>Equity % to risk per trade (IR):</td>
                                            <td></td>
                                            <td>1.00%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Value at risk per trade (VAR):</td>
                                            <td>$</td>
                                            <td>3,363</td>
                                        </tr>
                                        <tr>
                                            <td>Cash Balance</td>
                                            <td></td>
                                            <td>265,158</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Gain/Loss Preview Option:</td>
                                            <td></td>
                                            <td>Value</td>
                                        </tr>
                                        </tbody>
                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>

                    {/*card2*/}
                    <div className="col-xl-3 col-lg-6 col-md-7 col-sm-12">
                        <div className="   position-relative   ms-0  box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10" >
                                        <tr>
                                            <th className="font_Epilogue " style={{fontSize: '15px'}}>Portfolio</th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td>Total Bought value:</td>
                                            <td>$</td>
                                            <td>232,735</td>
                                        </tr>
                                        <tr className="">
                                            <td>Total Portfolio Trade Value:</td>
                                            <td></td>
                                            <td>242,400</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Total Equities Gain/Loss:</td>
                                            <td>$</td>
                                            <td>9,665</td>
                                        </tr>
                                        <tr className="">
                                            <td>Total Equities Gain/Loss%:</td>
                                            <td></td>
                                            <td>4.15%</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Total Account Equity Value:</td>
                                            <td>$</td>
                                            <td>507,558</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*card3*/}

                    <div className="col-xl-2 col-lg-6 col-md-5 col-sm-12">
                        <div className=" position-relative ms-0 box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-2">
                                    <p className="heading-20 font_Epilogue font_weight_400 mb-4">OPEN POSITION DATA</p>
                                    <button className="btn  text-white bg-primary-300 font_weight_500 p-lg-2 m-auto"
                                            type="submit">Refresh
                                        <i className="fa-solid fa-arrows-rotate ms-4"></i>
                                    </button>
                                    <p className="heading-16 font_Epilogue font_weight_300 mt-5">Click Refresh To Update
                                        The Portfolio Data</p>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*Card4*/}
                    <div className="col-xl-4  col-lg-6 col-md-6 col-sm-12">
                        <div className=" position-relative box-12 ms-0 overflow-x-auto">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts  mt-5 ">
                                    <table className="table mt-2  " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10" >
                                        <tr>
                                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Portfolio
                                                Forecast
                                            </th>
                                            <th className="font_Epilogue" style={{fontSize: '15px'}}></th>
                                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Worst Case
                                                Scenario
                                            </th>
                                            <th className="font_Epilogue" style={{fontSize: '15px'}}></th>
                                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Best Case
                                                Scenario
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td>Total Portfolio Trade Value:</td>
                                            <td>$</td>
                                            <td>5214700</td>
                                            <td>$</td>
                                            <td>5214700</td>
                                        </tr>
                                        <tr className="">
                                            <td>Total Equities gain/Loss:</td>
                                            <td>$</td>
                                            <td>5214700</td>
                                            <td>$</td>
                                            <td>5214700</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td>Total Equities gain/Loss%:</td>
                                            <td></td>
                                            <td>35%</td>
                                            <td></td>
                                            <td>35%</td>
                                        </tr>
                                        <tr className="">
                                            <td>Total Account Equity Value:</td>
                                            <td>$</td>
                                            <td>5214700</td>
                                            <td>$</td>
                                            <td>5214700</td>
                                        </tr>


                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    );
};

