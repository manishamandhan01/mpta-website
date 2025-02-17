// @flow 
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import {useEffect, useState} from "react";

type Props = {
    
};
export const TradeReview = (props: Props) => {
    const [years, setYears] = useState<number[]>([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 1980; // Starting year for the dropdown
        const generatedYears = [];

        for (let year = startYear; year <= currentYear; year++) {
            generatedYears.push(year);
        }

        setYears(generatedYears);
    }, []);
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
                    <i className="fa-solid fa-address-card "></i>
                    <p className="ps-2">Portfolio</p>
                </div>

                <div className="row col-12 m-auto mt-2">
                    {/*CardOne*/}
                    <div className="col-xl-1 col-md-5 col-sm-12">
                        <div className="portfolio-card-container position-relative box-12 p-0">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-2">
                                    <p className="heading-20 font_Epilogue font_weight_400 mb-4 text-center">Data
                                        Filter </p>
                                    <button
                                        className="btn  text-white bg-primary-300 rounded-pill p-lg-1 pe-2 ps-2 heading_14 m-auto "
                                        type="submit">This Month

                                    </button>
                                    <p className="heading-12 text-center mt-2">Select a Month & Year </p>
                                    <div className="d-flex align-items-center p-1">

                                        <label htmlFor="cars" className="heading-12">Month </label>

                                        <select name="months" id="months" className="mb-0 mw-50 m-auto">
                                            <option value="january">January</option>
                                            <option value="february">February</option>
                                            <option value="march">March</option>
                                            <option value="april">April</option>
                                            <option value="may">May</option>
                                            <option value="june">June</option>
                                            <option value="july">July</option>
                                            <option value="august">August</option>
                                            <option value="september">September</option>
                                            <option value="october">October</option>
                                            <option value="november">November</option>
                                            <option value="december">December</option>
                                        </select>

                                    </div>
                                    <div className="d-flex align-items-center p-1">

                                        <label htmlFor="cars" className="heading-12">Year </label>

                                        <select name="cars" id="cars" className="mb-0   ms-4 mw-50 m-auto  ">
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        className="btn  text-white bg-primary-300 rounded-pill p-lg-1 pe-2 ps-2 heading_14 m-auto mt-3 mb-1"
                                        type="submit">Apply <i className="fa-solid fa-check"></i>

                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                    {/*card2*/}
                    <div className="col-xl-3 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-4">
                                    <table className="table mt-2" style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                        <th className="font_Epilogue" style={{fontSize: '15px'}}>Account Name</th>
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
                    <div className="col-xl-2 col-md-5 col-sm-12">
                        <div className="portfolio-card-container position-relative box-12">
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

                    <div className="col-xl-3 col-md-7 col-sm-12">
                        <div className="portfolio-card-container   position-relative    box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-4">
                                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
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


                    {/*Card4*/}
                    <div className="col-xl-3 col-md-6 col-sm-12">
                        <div className="portfolio-card-container position-relative box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts  mt-4 ">
                                    <table className="table mt-2  " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
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

