// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";

type Props = {

};
export const Settings = (props: Props) => {
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Settings");
    return (
        <div>
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


                <div className=" row col-12  main-trade-log-cards m-auto mt-5 mb-1">

                    {/*CardOne*/}

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 mb-5 ">
                        <div className=" box-12 ms-0 position-relative ">
                            <div className="dashboard-overall-performance-card ">
                                <div className="amounts mt-1 ">
                                    <p className="heading-20 font_Epilogue font_weight_400 mb-4">Profile Settings</p>
                                        <button className=" col-3 btn    font_weight_500 p-lg-5 border   mt-5 background_grey_color "
                                                type="submit">
                                        </button>
                                        <p className=" col-3heading-20 font_Epilogue  font_weight_400 mb-5 mt-5 text-center">Manisha Mandhan</p>

                                    <button className="btn  text-white bg-primary-300 font_weight_500 p-lg-2 m-auto mt-1 mb-1"
                                            type="submit">Insert Photo
                                    </button>
                                    <p className="heading-16 font_Epilogue font_weight_300 mt-3">Click Here To
                                        Insert
                                        the Profile Image</p>


                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12">
                        <div className="">
                            <div className=" position-relative ms-0 box-12">
                                <div className="dashboard-overall-performance-card">
                                    <div className="amounts mt-2">
                                        <p className="heading-16 font_Epilogue font_weight_400 ">Distribution Chart
                                            settings</p>

                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">Interval %:
                                            <input type="number" min="0" step="0.01" id=""
                                                   className="mb-0 inputBox ms-4"/>
                                        </p>
                                        <p className="heading-16 font_Epilogue font_weight_400 mt-4">Performance Chart
                                            settings</p>

                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">Y axis Gap:
                                            <input type="number" min="0" step="0.01" id=""
                                                   className="mb-0 inputBox ms-4"/>
                                        </p>
                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">No.of Trades:
                                            <input type="number" min="0" step="0.01" id=""
                                                   className="mb-0 inputBox ms-1"/>

                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className=" position-relative ms-0 box-12">
                                <div className="dashboard-overall-performance-card">
                                    <div className="amounts mt-2">
                                        <p className="heading-16 font_Epilogue font_weight_400 mt-1">LOG
                                            Settings</p>

                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">Retain
                                            <input type="number" min="0" step="0.01" id="" placeholder="$"
                                                   className="mb-0 ms-5 inputBox "/>
                                            <p className="heading-16 font_Epilogue font_weight_300 mt-2">Formula:</p>

                                        </p>
                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">Rows
                                            <input type="number" min="0" step="0.01" id="" placeholder="$"
                                                   className="mb-0 ms-5 inputBox "/>
                                            <p className="heading-16 font_Epilogue font_weight_300 mt-2 "> to Add:</p>

                                        </p>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12">
                        <div className="">
                            <div className=" position-relative ms-0 box-12">
                                <div className="dashboard-overall-performance-card">
                                    <div className="amounts mt-2">
                                        <p className="heading-16 font_Epilogue font_weight_400 ">Currency
                                            settings</p>

                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">Currency
                                            <input type="number" min="0" step="0.01" id="" placeholder="$"
                                                   className="mb-0 ms-3 inputBox "/>
                                            <p className="heading-16 font_Epilogue font_weight_300 mt-2">Symbol:</p>

                                        </p>
                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">Preview:
                                            <input type="number" min="0" step="0.01" id="" placeholder="$"
                                                   className="mb-0 inputBox ms-4 "/>
                                            <button
                                                className="btn  text-white bg-primary-300 font_weight_500 p-lg-2 m-auto mt-3  float-end me-3 "
                                                type="submit">Apply
                                            </button>
                                        </p>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="mt-5">
                            <div className=" position-relative ms-0 box-12">
                                <div className="dashboard-overall-performance-card">
                                    <div className="amounts mt-2">
                                        <p className="heading-16 font_Epilogue font_weight_400 mt-1">STATS
                                            Settings</p>

                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">W/L
                                            <input type="number" min="0" step="0.01" id="" placeholder="$"
                                                   className="mb-0 ms-5 inputBox "/>
                                            <p className="heading-16 font_Epilogue font_weight_300 mt-2">Count:</p>

                                        </p>
                                        <p className="heading-16 font_Epilogue font_weight_300 mt-2">Last
                                            <input type="number" min="0" step="0.01" id="" placeholder="$"
                                                   className="mb-0 ms-5 inputBox "/>
                                            <p className="heading-16 font_Epilogue font_weight_300 mt-2 "> No. of
                                                Trades:</p>

                                        </p>


                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-5 col-lg-6 col-md-6 col-sm-12">
                        <div className="mb-5">
                            <div className=" position-relative ms-0 box-12">
                                <div className="dashboard-overall-performance-card">
                                <div className="amounts ">
                                        <table className="table mt-5 mb-5 " style={{borderCollapse: 'collapse'}}>

                                            <thead>
                                            <tr>
                                                <th className="font_Epilogue  font_weight_400"
                                                    style={{fontSize: '15px'}}>FEES
                                                </th>
                                                <th className="font_Epilogue font_weight_400 "
                                                    style={{fontSize: '15px'}}>FROM
                                                </th>
                                                <th className="font_Epilogue font_weight_400"
                                                    style={{fontSize: '15px'}}>MULTIPLY BY
                                                </th>
                                                <th className="font_Epilogue font_weight_400"
                                                    style={{fontSize: '15px'}}>MINIMUM
                                                </th>
                                                <th className="font_Epilogue font_weight_400"
                                                    style={{fontSize: '15px'}}>FROM
                                                </th>
                                                <th className="font_Epilogue font_weight_400"
                                                    style={{fontSize: '15px'}}>MAXIMUM
                                                </th>

                                            </tr>

                                            </thead>


                                            <tbody >
                                            <tr >
                                                <td className="heading-12">Comission</td>
                                                <td className="heading-12">Comission</td>
                                                <td className="heading-12">Comission</td>
                                                <td className="heading-12">Comission</td>
                                                <td className="heading-12">Comission</td>
                                                <td className="heading-12">Comission</td>
                                            </tr>
                                            <tr>
                                                <td className="heading-12">VAT</td>
                                            </tr>
                                            <tr>
                                                <td className="heading-12">TAX</td>
                                            </tr>
                                            <tr>
                                                <td className="heading-12">SALE TAX</td>
                                            </tr>

                                            </tbody>

                                        </table>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="row col-12  ">
                            <div className="col-6 mb-5">
                                <div className=" position-relative ms-0 box-12">
                                    <div className="dashboard-overall-performance-card">
                                        <div className="amounts mt-2">
                                            <p className="heading-16 font_Epilogue font_weight_400 mt-1">Report Date
                                                Settings</p>

                                            <p className="heading-16 font_Epilogue font_weight_300 mt-2">Report Date
                                                <input type="number" min="0" step="0.01" id=""
                                                       placeholder="Last Trade Data"
                                                       className="mb-0 ms-5 inputBox "/>
                                            </p>
                                            <button
                                                className="btn  text-white bg-primary-300 font_weight_500 p-lg-2 m-auto mt-5 me-1"
                                                type="submit">APPLY
                                                <i className="fa-solid fa-tick ms-4"></i>
                                            </button>
                                        </div>

                                    </div>
                                </div>
                            </div>
                            <div className="col-6 mb-5">
                                <div className=" position-relative ms-0 box-12 ">
                                    <div className="dashboard-overall-performance-card mt-2">
                                        <div className="amounts mt-2">

                                            <button
                                                className="btn  text-white bg-primary-300 font_weight_500 p-lg-2 m-auto mt-5 mb-5"
                                                type="submit">Clear Data
                                                <i className="fa-solid fa-arrows-rotate ms-4"></i>
                                            </button>

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

