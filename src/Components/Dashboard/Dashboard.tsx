// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import 'font-awesome/css/font-awesome.min.css';
import {OverAllPerformanceCard} from "@Components/Dashboard/OverAllPerformanceCard.tsx";
import {DistributionGainLossBar} from "@Components/Dashboard/DistributionGainLossBar.tsx";
import {OverAllTradeStatisticsCard} from "@Components/Dashboard/OverAllTradeStatisticsCard.tsx";
import {PerformancePerRecord} from "@Components/Dashboard/PerformancePerRecord.tsx";
import {TradeStatistics} from "@Components/Dashboard/TradeStatistics.tsx";
import {PerformanceCurve} from "@Components/Dashboard/PerformanceCurve.tsx";
import {WeeklyPerformanceCurve} from "@Components/Dashboard/WeeklyPerformanceCurve.tsx";
import {DrawnAndLosingStreak} from "@Components/Dashboard/DrawnAndLosingStreak.tsx";
import {RequiredWinRate} from "@Components/Dashboard/RequiredWinRate.tsx";
import { FaBars } from 'react-icons/fa';
import { Collapse } from 'react-bootstrap';
import {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";



type Props = {};

export const Dashboard = (props: Props) => {
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Dashboard");
    const [open, setOpen] = useState(true);
    const [activeItem, setActiveItem] = useState<string>('Dashboard');

    const menuItems = [
        'Dashboard',
        'Trade Log',
        'Bank Transfers',
        'Portfolio',
        'Trade Review',
        'Monthly Report',
        'Calendar',
        'Stock Positions',
        'Dividends',
        'Settings'
    ];

    return (
        <div>
            <div className="pb-3 ">
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
                {/*<div className="d-flex">*/}
                {/*    /!* Sidebar *!/*/}
                {/*    <div className="d-flex flex-column bg-white box-12 p-2 mt-5 ms-5"*/}
                {/*         style={{width: open ? '250px' : '80px', transition: 'width 0.3s'}}*/}
                {/*    >*/}
                {/*        /!* Toggle Button *!/*/}
                {/*        <div*/}
                {/*            className="d-flex align-items-center font_weight_300 font_poppins line_height_20 heading_24 mb-4 mt-3 ms-2">*/}
                {/*            <i className="fa-solid fa-bars" onClick={() => setOpen(!open)}></i>*/}
                {/*            {open && <h5 className="mb-0 ms-2">Categories</h5>}*/}
                {/*        </div>*/}

                {/*        /!* Menu Items *!/*/}
                {/*        <Collapse in={open}>*/}
                {/*            <div>*/}
                {/*                {DashboardData.map((item, index) => {*/}
                {/*                    const isActive = activeLabel === item.label; // Checking if the item is active*/}
                {/*                    return (*/}
                {/*                        <div*/}
                {/*                            key={index}*/}
                {/*                            onClick={() => setActiveLabel(item.label)} // Update active label*/}
                {/*                            className="p-2"*/}
                {/*                            style={{*/}
                {/*                                color: isActive ? '#007bff' : '#000',*/}
                {/*                                cursor: 'pointer',*/}
                {/*                                fontWeight: isActive ? 'bold' : 'normal',*/}
                {/*                            }}*/}
                {/*                        >*/}
                {/*                            <a*/}
                {/*                                href={item.label}*/}
                {/*                                className={`ms-5 text_gray font_weight_300 font_poppins line_height_20 heading_24 ${isActive ? 'active-tab' : ''}`}*/}
                {/*                            >*/}
                {/*                                {item.label}*/}
                {/*                            </a>*/}
                {/*                        </div>*/}
                {/*                    );*/}
                {/*                })}*/}
                {/*            </div>*/}
                {/*        </Collapse>*/}

                {/*        /!* Icons only when collapsed *!/*/}
                {/*        {!open && (*/}
                {/*            <div className="d-flex flex-column align-items-center">*/}
                {/*                {DashboardData.map((item, index) => {*/}
                {/*                    const isActive = activeLabel === item.label;*/}
                {/*                    return (*/}
                {/*                        <div*/}
                {/*                            key={index}*/}
                {/*                            onClick={() => setActiveLabel(item.label)}*/}
                {/*                            className="p-2 text-center"*/}
                {/*                            style={{*/}
                {/*                                color: isActive ? '#007bff' : '#000',*/}
                {/*                                cursor: 'pointer',*/}
                {/*                                fontSize: '12px',*/}
                {/*                            }}*/}
                {/*                        >*/}
                {/*                            <i className={item.icon} style={{fontSize: '20px'}}></i>*/}
                {/*                        </div>*/}
                {/*                    );*/}
                {/*                })}*/}
                {/*            </div>*/}
                {/*        )}*/}
                {/*    </div>*/}


                {/* Main Content */}
                <div className="dashboard-container flex-grow-1 ">
                    <div className="dashboard-header col-xl-3 col-lg-6 col-md-6 col-sm-12 ">
                        <div className="vertical-line me-2"></div>
                        <h1 className="font_poppins font_weight_500 heading-20 line_height_24">Overall Summary</h1>
                    </div>
                    <div className="row col-12 m-auto mt-2 equal-height">

                        <div className="col-xl-3 col-lg-6 col-md-7 col-sm-12">
                            <OverAllPerformanceCard/>
                        </div>
                        <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 dashboard-overall-performance-card">
                            <DistributionGainLossBar/>
                        </div>
                        <div className="col-xl-3  col-lg-6 col-md-7 col-sm-12">
                            <OverAllTradeStatisticsCard/>
                        </div>

                    </div>

                </div>

            </div>


            {/*<div>*/
            }
            {/*    <div className="ua_top_item">*/
            }
            {/*        <ul>*/
            }
            {/*            {DashboardData.map((item, index: number) => {*/
            }
            {/*                const isActive = activeLabel === item.label;*/
            }

            {/*                return (*/
            }
            {/*                    <li key={index}>*/
            }
            {/*                        <a*/
            }
            {/*                            href={item.label}*/
            }
            {/*                            className={`text_gray font_weight_300 font_poppins line_height_20 heading_24 ${*/
            }
            {/*                                isActive ? "active-tab" : ""*/
            }
            {/*                            }`}*/
            }
            {/*                            onClick={() => setActiveLabel(item.label)}*/
            }
            {/*                        >*/
            }
            {/*                            {item.label}*/
            }
            {/*                        </a>*/
            }
            {/*                    </li>*/
            }
            {/*                );*/}
            {/*            })}*/}
            {/*        </ul>*/}
            {/*    </div>*/}
            {/*</div>*/}


            {/*OverAllSummary*/}


            {/*Anlytics*/}
            <div className="dashboard-container">
                <div className="dashboard-header col-xl-3 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="vertical-line me-2"></div>


                    <h1 className=" font_poppins font_weight_500 heading-20 line_height_24">Analytics</h1>
                </div>
                <div className="row col-12 m-auto mt-2 equal-height">

                    <div className="col-xl-3 col-lg-6 col-md-7 col-sm-12">
                        <DrawnAndLosingStreak/>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 dashboard-overall-performance-card">
                        <TradeStatistics/>
                    </div>
                    <div className="col-xl-3  col-lg-6 col-md-7 col-sm-12">
                        <RequiredWinRate/>
                    </div>

                </div>

            </div>


            {/*Performance Curve*/}
            <div className="dashboard-container mb-5">
                <div className="dashboard-header col-xl-3 col-lg-6 col-md-6 col-sm-12 ">
                    <div className="vertical-line me-2"></div>


                    <h1 className=" font_poppins font_weight_500 heading-20 line_height_24"> Performance summary</h1>
                </div>
                <div className="row col-12 m-auto mt-2 equal-height">
                    <div className="col-xl-3 col-lg-6 col-md-7 col-sm-12">
                        <PerformancePerRecord/>
                    </div>
                    <div className="col-xl-6 col-lg-6 col-md-7 col-sm-12 dashboard-overall-performance-card">
                        <PerformanceCurve/>
                    </div>
                    <div className="col-xl-3  col-lg-6 col-md-7 col-sm-12">
                        <WeeklyPerformanceCurve/>
                    </div>

                </div>

            </div>


        </div>

    );
            };