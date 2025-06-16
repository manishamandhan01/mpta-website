import * as React from 'react';
import {useEffect, useState} from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import {EntryExitTableWithChart} from "@Components/TradeReview/EntryExitTableWithChart.tsx";
import {EmotionTableWithChart} from "@Components/TradeReview/EmotionTableWithChart.tsx";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";
import TradeReviewDataGrid from "@Components/DataGrid/TradeReviewDataGrid.tsx";
import {TradeRow, useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";
import dayjs from "dayjs";
import {
    Autocomplete,
    Checkbox,
    FormControl,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select
} from '@mui/material';
import TextField from "@mui/material/TextField";

type Props = {};

export const TradeReview = (props: Props) => {
    const {tradeRows, setFinalTradeRows, tradingSetting} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();
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

    // Month/year filter state
    const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
    const [selectedYear, setSelectedYear] = useState<number | null>(null);
    const [filteredTradeRows, setFilteredTradeRows] = useState<TradeRow[]>([]);
    const [filterApplied, setFilterApplied] = useState<boolean>(false);
    const [selectedStockIds, setSelectedStockIds] = useState<string[]>([]);
    const uniqueStockIds = Array.from(new Set(tradeRows.map(row => row.ticker))).filter(Boolean);
    const [selectedSetups, setSelectedSetups] = useState<string[]>([]);
    const uniqueSetups = Array.from(new Set(tradingSetting.setupSettings.map(row => row.setup))).filter(Boolean);
    const [selectedExecutions, setSelectedExecutions] = useState<string[]>([]);
    const uniqueExecutions = Array.from(new Set(tradingSetting.evaluationSettings.map(row => row.entryExit))).filter(Boolean);
    const [selectedEmotions, setSelectedEmotions] = useState<string[]>([]);
    const uniqueEmotions = Array.from(new Set(tradingSetting.evaluationSettings.map(row => row.entryExit))).filter(Boolean);

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setFinalTradeRows(json['trade_log_result_data']);
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
            <div className="pb-5 ">
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
                    ` <div className="col-xl-1 col-md-5 col-sm-12">
                    <div className="portfolio-card-container position-relative box-12 p-0">
                        <div className="dashboard-overall-performance-card">
                            <div className="amounts mt-2 gap-3">
                                <p className="heading-20 font_Epilogue font_weight_400 mb-4 text-center">Date
                                    Filter</p>
                                <button
                                    className="btn text-white bg-primary-300 rounded-pill p-lg-1 pe-2 ps-2 heading_14 m-auto"
                                    type="button"
                                    onClick={() => {
                                        const currentDate = new Date();
                                        const currentMonth = currentDate.getMonth() + 1; // Month is 0-indexed
                                        const currentYear = currentDate.getFullYear();

                                        setSelectedMonth(currentMonth);
                                        setSelectedYear(currentYear);

                                        const filtered = tradeRows.filter(row => {
                                            const tradeDate = dayjs(row.date, tradingSetting.dateFormat.toUpperCase()).toDate();
                                            return (
                                                tradeDate.getMonth() + 1 === currentMonth &&
                                                tradeDate.getFullYear() === currentYear
                                            );
                                        });
                                        setFilterApplied(true);

                                        setFilteredTradeRows(filtered);
                                    }}
                                >
                                    This Month
                                </button>
                                <p className="heading-12 text-center mt-2">Select a Month & Year</p>
                                <div className="d-flex align-items-center stock_id_table p-1">
                                    <label htmlFor="months" className="heading-12">Month</label>
                                    <select
                                        name="months"
                                        id="months"
                                        className="mb-0 mw-50  m-auto"
                                        onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
                                    >
                                    <option value="">Select</option>
                                        <option value="1">January</option>
                                        <option value="2">February</option>
                                        <option value="3">March</option>
                                        <option value="4">April</option>
                                        <option value="5">May</option>
                                        <option value="6">June</option>
                                        <option value="7">July</option>
                                        <option value="8">August</option>
                                        <option value="9">September</option>
                                        <option value="10">October</option>
                                        <option value="11">November</option>
                                        <option value="12">December</option>
                                    </select>
                                </div>
                                <div className="d-flex align-items-center p-1 stock_id_table">
                                    <label htmlFor="cars" className="heading-12">Year</label>
                                    <select
                                        name="cars"
                                        id="cars"
                                        className="mb-0 ms-2 mw-50 m-auto"
                                        onChange={(e) => setSelectedYear(parseInt(e.target.value))}
                                    >
                                        <option value="">Select</option>
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
                                    onClick={() => {
                                        if (selectedMonth && selectedYear) {
                                            const filtered = tradeRows.filter(row => {
                                                const tradeDate = dayjs(row.date, tradingSetting.dateFormat.toUpperCase()).toDate();
                                                return (
                                                    tradeDate.getMonth() + 1 === selectedMonth &&
                                                    tradeDate.getFullYear() === selectedYear
                                                );
                                            });
                                            setFilterApplied(true);
                                            setFilteredTradeRows(filtered);
                                        }
                                    }}
                                >
                                    Apply <i className="fa-solid fa-check"></i>
                                </button>
                                <button
                                    className="btn text-white bg-secondary rounded-pill p-lg-1 pe-2 ps-2 heading_14 m-auto mt-2"
                                    type="button"
                                    onClick={() => {
                                        setSelectedMonth(null);
                                        setSelectedYear(null);
                                        setFilteredTradeRows([]);
                                        setFilterApplied(false);
                                    }}
                                >
                                     <i className="fa-solid fa-rotate-left"></i>
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
                                            <Autocomplete
                                                multiple
                                                options={uniqueStockIds}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option}
                                                value={selectedStockIds}
                                                onChange={(event, newValue) => setSelectedStockIds(newValue)}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                        <Checkbox
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                        />
                                                        {option}
                                                    </li>
                                                )}
                                                renderTags={() => null} // hide tags
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Stock ID"
                                                        placeholder={
                                                            selectedStockIds.length > 0
                                                                ? `${selectedStockIds.length} selected`
                                                                : "Select stocks"
                                                        }
                                                    />
                                                )}
                                                style={{ width: 190 }}
                                            />
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto "
                                                type="submit"
                                                onClick={() => {

                                                    if (selectedStockIds) {
                                                        const filtered = tradeRows.filter(row => {
                                                            return (
                                                                selectedStockIds.includes(row.ticker)
                                                            );
                                                        });
                                                        setFilterApplied(true);
                                                        setFilteredTradeRows(filtered);
                                                    }
                                                }}
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                        <div className="d-flex stock_id_table align-items-center p-1">

                                            <label htmlFor="" className="heading-12">SetUp</label>
                                            <Autocomplete
                                                multiple
                                                options={uniqueSetups}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option}
                                                value={selectedSetups}
                                                onChange={(event, newValue) => setSelectedStockIds(newValue)}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                        <Checkbox
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                        />
                                                        {option}
                                                    </li>
                                                )}
                                                renderTags={() => null} // hide tags
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Setup"
                                                        placeholder={
                                                            selectedSetups.length > 0
                                                                ? `${selectedSetups.length} selected`
                                                                : "Select Setup"
                                                        }
                                                    />
                                                )}
                                                style={{ width: 190 }}
                                            />
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto "
                                                type="submit"
                                                onClick={() => {

                                                    if (selectedSetups) {
                                                        const filtered = tradeRows.filter(row => {
                                                            return (
                                                                selectedSetups.includes(row.ticker)
                                                            );
                                                        });
                                                        setFilterApplied(true);
                                                        setFilteredTradeRows(filtered);
                                                    }
                                                }}
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                        <div className="d-flex stock_id_table align-items-center p-1">
                                            <label htmlFor="months" className="heading-12">Execution</label>
                                            <Autocomplete
                                                multiple
                                                options={uniqueExecutions}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option}
                                                value={selectedExecutions}
                                                onChange={(event, newValue) => setSelectedStockIds(newValue)}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                        <Checkbox
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                        />
                                                        {option}
                                                    </li>
                                                )}
                                                renderTags={() => null} // hide tags
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Execution"
                                                        placeholder={
                                                            selectedExecutions.length > 0
                                                                ? `${selectedExecutions.length} selected`
                                                                : "Select Executions"
                                                        }
                                                    />
                                                )}
                                                style={{ width: 190 }}
                                            />
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto "
                                                type="submit"
                                                onClick={() => {

                                                    if (selectedExecutions) {
                                                        const filtered = tradeRows.filter(row => {
                                                            return (
                                                                selectedExecutions.includes(row.ticker)
                                                            );
                                                        });
                                                        setFilterApplied(true);
                                                        setFilteredTradeRows(filtered);
                                                    }
                                                }}
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                        <div className="d-flex stock_id_table align-items-center p-1">
                                            <label htmlFor="months" className="heading-12">Emotion</label>
                                            <Autocomplete
                                                multiple
                                                options={uniqueEmotions}
                                                disableCloseOnSelect
                                                getOptionLabel={(option) => option}
                                                value={selectedEmotions}
                                                onChange={(event, newValue) => setSelectedStockIds(newValue)}
                                                renderOption={(props, option, { selected }) => (
                                                    <li {...props}>
                                                        <Checkbox
                                                            style={{ marginRight: 8 }}
                                                            checked={selected}
                                                        />
                                                        {option}
                                                    </li>
                                                )}
                                                renderTags={() => null} // hide tags
                                                renderInput={(params) => (
                                                    <TextField
                                                        {...params}
                                                        variant="outlined"
                                                        label="Emotion"
                                                        placeholder={
                                                            selectedEmotions.length > 0
                                                                ? `${selectedEmotions.length} selected`
                                                                : "Select Emotions"
                                                        }
                                                    />
                                                )}
                                                style={{ width: 190 }}
                                            />
                                            <button
                                                className="btn  bg-light border border-dark  p-lg-1 pe-2 ps-2 heading_14 m-auto "
                                                type="submit"
                                                onClick={() => {

                                                    if (selectedEmotions) {
                                                        const filtered = tradeRows.filter(row => {
                                                            return (
                                                                selectedEmotions.includes(row.ticker)
                                                            );
                                                        });
                                                        setFilterApplied(true);
                                                        setFilteredTradeRows(filtered);
                                                    }
                                                }}
                                            >
                                                <i className="fa-solid fa-check"></i>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="d-flex gap-4 justify-content-center mt-2 align-items-center">
                                        <i className="fa-solid fa-filter-circle-xmark icon-large-30" onClick={() => {
                                            setFilterApplied(false);
                                        }}></i>
                                        <button className="circle-btn bg-success m-0">W</button>
                                        <button className="circle-btn bg-danger m-0">L</button>

                                        {/*<i className="fa-solid fa-rotate icon-large icon-large-20"></i>*/}
                                        {/*<button className="circle-btn bg-light m-0"><i*/}
                                        {/*    className="fa-solid fa-arrow-up icon-black icon-large-20"></i>*/}
                                        {/*</button>*/}
                                        {/*<button className="circle-btn bg-light m-0"><i*/}
                                        {/*    className="fa-solid fa-arrow-down icon-black icon-large-20"></i>*/}
                                        {/*</button>*/}
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

                    <div className="amounts mt-4  d-flex flex-row">
                        <TradeReviewDataGrid
                            onRowsChange={handleTradeRowsChange}
                            filteredTradeRows={filteredTradeRows.length || filterApplied ? filteredTradeRows : tradeRows}
                        />
                    </div>

                </div>
            </div>
        </div>
    );
};
