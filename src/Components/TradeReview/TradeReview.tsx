import * as React from 'react';
import { DashboardData } from "@Components/Dashboard/DashboardData.tsx";
import { useEffect, useState } from "react";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {EntryExitTableWithChart} from "@Components/TradeReview/EntryExitTableWithChart.tsx";
import {EmotionTableWithChart} from "@Components/TradeReview/EmotionTableWithChart.tsx";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";

type Props = {};

export const TradeReview = (props: Props) => {
    const [years, setYears] = useState<number[]>([]);
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Trade Review");
    useEffect(() => {
        const currentYear = new Date().getFullYear();
        const startYear = 1980; // Starting year for the dropdown
        const generatedYears = [];

        for (let year = startYear; year <= currentYear; year++) {
            generatedYears.push(year);
        }

        setYears(generatedYears);
    }, []);

    // Data retrieved from https://en.wikipedia.org/wiki/Winter_Olympic_Games
    const barChart = {
        chart: {
            type: 'column',
            height:'250px'
        },

        title: {
            text: '',
            align: 'left'
        },

        xAxis: {
            categories: ['All Trades', 'Last 50 Trades']
        },

        yAxis: {
            allowDecimals: false,
            min: 0,
            max: 100, // Set the max value to 100 to represent 100% win rate
            title: {
                text: 'Win Rate %'
            },
            labels: {
                formatter: function () {
                    return this.value + '%'; // Display the percentage sign next to the value
                }
            }
        },

        tooltip: {
            pointFormat: '{point.y}%'
        },

        plotOptions: {
            column: {
                stacking: 'normal'
            }
        },

        series: [{
            name: 'All Trades',
            data: [20, 50], // Replace with the appropriate values (percentage data)
            stack: 'Europe',
            showInLegend: false, // Hides the series name in the legend
            color:'#28a745'
        }, {
            name: 'Last 50 Trades',
            data: [50, 65], // Replace with the appropriate values (percentage data)
            stack: 'Europe',
            showInLegend: false ,// Hides the series name in the legend
            color:'#dc3545'
        }],
    };



    return (
        <div className="pb-5">
            <div className="dashboard-top_item pe-5 ps-5 row ">
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

            <div>
                <div className="d-flex align-items-center ms-4 p-3">
                    <i className="fa-brands fa-searchengin heading-24"></i>
                    <p className="ps-2">Trade Review</p>
                </div>

                <div className="row col-12 m-auto mt-2">
                    {/* Card One */}
                    <div className="col-xl-1 col-md-5 col-sm-12">
                        <div className="portfolio-card-container position-relative box-12 p-0">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-2 gap-3">
                                    <p className="heading-20 font_Epilogue font_weight_400 mb-4 text-center">Data
                                        Filter</p>
                                    <button
                                        className="btn text-white bg-primary-300 rounded-pill p-lg-1 pe-2 ps-2 heading_14 m-auto"
                                        type="submit"
                                    >
                                        This Month
                                    </button>
                                    <p className="heading-12 text-center mt-2">Select a Month & Year</p>
                                    <div className="d-flex align-items-center stock_id_table p-1">
                                        <label htmlFor="months" className="heading-12">Month</label>
                                        <select name="months" id="months" className="mb-0 mw-50  m-auto">
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
                                    <div className="d-flex align-items-center p-1 stock_id_table">
                                        <label htmlFor="cars" className="heading-12">Year</label>
                                        <select name="cars" id="cars" className="mb-0 ms-2 mw-50 m-auto">
                                            {years.map((year) => (
                                                <option key={year} value={year}>
                                                    {year}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                    <button
                                        className="btn text-white bg-primary-300 rounded-pill p-lg-1 pe-2 ps-2 heading_14 m-auto mt-3 mb-1"
                                        type="submit"
                                    >
                                        Apply <i className="fa-solid fa-check"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Two */}
                    <div className="col-xl-3 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-2">
                                    <p className="heading-20 font_Epilogue font_weight_400 mb-4 ">Trade Filter</p>
                                    <div>
                                        <div className="d-flex stock_id_table align-items-center p-1">

                                            <label htmlFor="" className="heading-12">Stock ID</label>
                                            <select name="" id="" className="mb-0 mw-50 m-auto mt-0">
                                                <option value=""></option>
                                            </select>
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto "
                                                type="submit"
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                        <div className="d-flex stock_id_table align-items-center p-1">

                                            <label htmlFor="" className="heading-12">SetUp</label>
                                            <select name="" id="" className="mb-0 mw-50 m-auto mt-0">
                                                <option value=""></option>
                                            </select>
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto "
                                                type="submit"
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                        <div className="d-flex stock_id_table align-items-center p-1">
                                            <label htmlFor="months" className="heading-12">SetUp</label>
                                            <select name="" id="" className="mb-0 mw-50 m-auto mt-0">
                                                <option value="">Momentum</option>
                                                <option value="">Bounce</option>
                                                <option value="">Trend Follow</option>
                                                <option value="">Swing Trade</option>
                                                <option value="">Bottom Fishing</option>
                                            </select>
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto "
                                                type="submit"
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                        <div className="d-flex stock_id_table align-items-center p-1">
                                            <label htmlFor="months" className="heading-12">Execution</label>
                                            <select name="" id="" className="mb-0 mw-50 m-auto mt-0">
                                                <option value="">As Planned</option>
                                                <option value="">Too Early</option>
                                                <option value="">Too Late</option>
                                                <option value="">Not In Plan</option>
                                                <option value="">Broke Rules</option>
                                                <option value="">News</option>
                                                <option value="">Funda</option>
                                            </select>
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto"
                                                type="submit"
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                        <div className="d-flex stock_id_table align-items-center p-1">
                                            <label htmlFor="months" className="heading-12">Emotion</label>
                                            <select name="" id="" className="mb-0 mw-50 m-auto mt-0">
                                                <option value="">Bored</option>
                                                <option value="">Fear</option>
                                                <option value="">Hope</option>
                                                <option value="">Greed</option>
                                                <option value="">Impulse</option>
                                                <option value="">Fomo</option>
                                                <option value="">Confident</option>
                                            </select>
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto"
                                                type="submit"
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-4 justify-content-center mt-2 align-items-center">
                                        <i className="fa-solid fa-filter-circle-xmark icon-large-30"></i>
                                        <button className="circle-btn bg-success m-0">W</button>
                                        <button className="circle-btn bg-danger m-0">L</button>

                                        <i className="fa-solid fa-rotate icon-large icon-large-20"></i>
                                        <button className="circle-btn bg-light m-0"><i
                                            className="fa-solid fa-arrow-up icon-black icon-large-20"></i>
                                        </button>
                                        <button className="circle-btn bg-light m-0"><i
                                            className="fa-solid fa-arrow-down icon-black icon-large-20"></i>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Three */}
                    <div className="col-xl-2 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-2">
                                    <p className="heading-20 font_Epilogue font_weight_400 mb-4 ">Trade Statistics</p>
                                    <div>

                                        <HighchartsReact
                                            highcharts={Highcharts}
                                            options={barChart}
                                        />

                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Four */}
                    <div className="col-xl-3 col-md-7 col-sm-12">
                        <div className="portfolio-card-container position-relative box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-4">


                                    <EntryExitTableWithChart/>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Card Five (Portfolio Forecast) */}
                    <div className="col-xl-3 col-md-7 col-sm-12">
                        <div className="portfolio-card-container position-relative box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-4">


                                    <EmotionTableWithChart/>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
