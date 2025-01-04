import Highcharts from "highcharts/highstock";
import { StockDataModel } from "@Components/Models/StockDataModel.tsx";
import React, { useEffect, useRef } from "react";

import { SearchDialogForTicker } from "@Components/Charts/SearchDialogForTicker.tsx";
import {DropdownInterval} from "@Components/Utils/DropdownInterval.tsx";
import {MenuItem} from "@mui/material";
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {currentTime, formatDate, subtractDaysFromDate} from "@Components/Utils/DateUtil.tsx";
import {daysButtonData, multiplierButtonData} from "@Components/Charts/CandleChartData.tsx";

export const CandleChart = () => {
    const [stockData, setStockData] = React.useState<StockDataModel[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedTicker, setSelectedTicker] = React.useState<string>("AAPL");
    const chartRef = useRef<Highcharts.Chart | null>(null);
    const [fromDate , setFromDate] = React.useState(subtractDaysFromDate(2));
    const [toDate, setToDate] = React.useState(subtractDaysFromDate(1));
    const [multiplier, setMultiplier] = React.useState<string>("1");

    const fetchChartData = (numberOfDays?: number) => {
        if(numberOfDays !== undefined){
           const fromDate = subtractDaysFromDate(numberOfDays + 1);
            setFromDate(fromDate);
        }
        fetch(
            `http://localhost:8000/stockapis/v1?format=json&url=v2%2Faggs%2Fticker%2F${selectedTicker}%2Frange%2F${multiplier}%2Fminute%2F${formatDate(fromDate)}%2F${formatDate(toDate)}%3Fadjusted%3Dtrue%26sort%3Dasc%26apiKey%3DvM4IvSPxWHLtSRa5vSYhXhQ70_A1Zr6B`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
            .then((res) => res.json())
            .then((json) => {
                setStockData(json.results);
            })
            .catch((err) => console.error("Error fetching data:", err));
    };

    const bindHighChart = (data: StockDataModel[]) => {
        const ohlc = [];
        const volume = [];

        for (const entry of data) {
            ohlc.push([entry.t, entry.o, entry.h, entry.l, entry.c]);
            volume.push([entry.t, entry.v]);
        }

        // Destroy the previous chart instance if it exists
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        // Create a new chart instance
        chartRef.current = Highcharts.stockChart("candleStickContainer", {
            rangeSelector: {
                selected: 4,
            },
            title: {
                text: `${selectedTicker} Historical`,
            },
            yAxis: [
                {
                    labels: {
                        align: "right",
                        x: -3,
                    },
                    title: {
                        text: "OHLC",
                    },
                    height: "60%",
                    lineWidth: 2,
                    resize: {
                        enabled: true,
                    },
                },
                {
                    labels: {
                        align: "right",
                        x: -3,
                    },
                    title: {
                        text: "Volume",
                    },
                    top: "65%",
                    height: "35%",
                    offset: 0,
                    lineWidth: 2,
                },
            ],
            tooltip: {
                split: true,
            },
            series: [
                {
                    type: "candlestick",
                    name: selectedTicker,
                    data: ohlc,
                },
                {
                    type: "column",
                    name: "Volume",
                    data: volume,
                    yAxis: 1,
                }
            ],
            chart: {
                events: {
                    load: function () {
                        const chart = this;
                        chart.renderer.button(selectedTicker, 0, 0, function () {

                        })
                            .attr({
                                zIndex: 5
                            })
                            .add()
                            .on('click', function () {
                                setOpen(prevState => !prevState);
                            });
                    }
                }
            }
        });
        /*if (chart){
            const button = chart.renderer.button;
            if(button){
                button.attr({
                    text:selectedTicker
                });
            }
        }*/
    };

    useEffect(() => {
        // If `stockData` changes, bind the chart
        if (stockData.length > 0) {
            bindHighChart(stockData);
        }
        // If `selectedTicker` changes, fetch new data
        else {
            fetchChartData();
        }
    }, [selectedTicker, stockData]);

    useEffect(() => {
        fetchChartData();
    }, [multiplier,fromDate,toDate]);

    const handleClose = () => setOpen(false);

    const updateMultiplier = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // If you need to access the value from button element
        const newValue = event.currentTarget.value;
        console.log(newValue);
        setMultiplier(newValue); // Update the multiplier state
    };

    const updateFromDate = (numberOfDays: number) => {
        setFromDate(subtractDaysFromDate(numberOfDays + 1));
    }

    return (
        <>
            <div className="cardTopSection d-flex align-items-center">

                <div className="layout__area--topleft" style={{ position: 'absolute', top: '0px', left: '0px', height: '38px', width: '52px' }}>
                    <div className="topLeftButton-hCWTCWBf">
                        <div className="menu-U2jIw4km">
                            <div className="buttonWrap-U2jIw4km">
                                <div data-role="button"
                                     className="button-U2jIw4km button-GwQQdU8S apply-common-tooltip isInteractive-GwQQdU8S">
                                    <img className="icon-GwQQdU8S userPic-U2jIw4km"
                                         src="data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220,0,20,20%22%20width=%2239%22%20height=%2239%22%3E%3Crect%20height=%2220%22%20width=%2220%22%20fill=%22hsl%28216,25%25,50%25%29%22/%3E%3Ctext%20fill=%22white%22%20x=%2210%22%20y=%2214.8%22%20font-size=%2214%22%20font-family=%22-apple-system,BlinkMacSystemFont,Trebuchet%20MS,Roboto,Ubuntu,sans-serif%22%20text-anchor=%22middle%22%3EM%3C/text%3E%3C/svg%3E"/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="topLayoutGroup">
                    <button aria-label="Symbol Search" id="header-toolbar-symbol-search" type="button"
                            className="uppercase-cq__ntSC button-GwQQdU8S button-cq__ntSC apply-common-tooltip isInteractive-GwQQdU8S accessible-GwQQdU8S"
                            data-tooltip="Symbol Search"
                            onClick={() => setOpen(true)}>
                        <span role="img" className="icon-GwQQdU8S" aria-hidden="true">
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path
                            fill="currentColor"
                            d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM8 2a6 6 0 1 0 3.65 10.76l3.58 3.58 1.06-1.06-3.57-3.57A6 6 0 0 0 8 2Z"></path></svg></span>
                        <div className="js-button-text text-GwQQdU8S text-cq__ntSC">{selectedTicker}</div>
                    </button>
                    <button aria-label="Compare or Add Symbol" id="header-toolbar-compare" aria-haspopup="dialog"
                            type="button"
                            className="button-OhqNVIYA button-ptpAHg8E withoutText-ptpAHg8E button-GwQQdU8S apply-common-tooltip isInteractive-GwQQdU8S accessible-GwQQdU8S"
                            data-tooltip="Compare or Add Symbol"><span role="img" className="icon-GwQQdU8S"
                                                                       aria-hidden="true"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                        fill="currentColor"
                        d="M13.5 6a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM4 14.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"></path><path
                        fill="currentColor" d="M9 14h4v-4h1v4h4v1h-4v4h-1v-4H9v-1z"></path></svg></span></button>
                </div>

                <div className="topLayoutGroupSeparator">
                    <div className="separatorBar"></div>
                </div>

                <div className="topLayoutGroup">
                    <select
                        className="menu-S_1OCXUK button-merBkM5y"
                        value={multiplier}
                        onChange={updateMultiplier}
                    >
                        {multiplierButtonData.map((item) => (
                            <option key={item.label} value={item.value}>
                                {item.label}
                            </option>
                        ))}
                    </select>
                    {/*<div className="wrap-n5bmFxyX" id="header-toolbar-intervals">*/}
                    {/*    <button*/}
                    {/*        className="menu-S_1OCXUK button-merBkM5y"*/}
                    {/*        value={multiplier}*/}
                    {/*        onClick={updateMultiplier} // Change from onChange to onClick*/}
                    {/*    >*/}
                    {/*        {multiplier}*/}
                    {/*    </button>*/}
                    {/*</div>*/}
                </div>

                <div className="topLayoutGroupSeparator">
                    <div className="separatorBar separator-MBOVGQRI"></div>
                </div>

                <div className="topLayoutGroup">
                    <div className="wrap-n5bmFxyX" id="header-toolbar-chart-styles">
                        <button type="button"
                                className="menu-b3Cgff6l button-merBkM5y apply-common-tooltip accessible-merBkM5y"
                                data-tooltip="Line with markers" aria-label="Line with markers"
                                aria-haspopup="menu">
                            <div className="wrap-n5bmFxyX"><span role="img" aria-hidden="true"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"
                                fill="currentColor"><path fill-rule="evenodd"
                                                          d="m18.43 15.91 6.96-8.6-.78-.62-6.96 8.6a2.49 2.49 0 0 0-2.63.2l-2.21-2.02A2.5 2.5 0 0 0 10.5 10a2.5 2.5 0 1 0 1.73 4.3l2.12 1.92a2.5 2.5 0 1 0 4.08-.31ZM10.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path><path
                                d="M8.37 13.8c.17.3.4.54.68.74l-5.67 6.78-.76-.64 5.75-6.88Z"></path></svg></span></div>
                        </button>
                    </div>
                </div>
                <div className="topLayoutGroupSeparator">
                    <div className="separatorBar separator-MBOVGQRI"></div>
                </div>
                <div className="topLayoutGroup">
                    <div className="wrap-n5bmFxyX" id="header-toolbar-indicators">
                        <button aria-label="Indicators, metrics, and strategies" data-role="button"
                                data-tooltip-hotkey="{&amp;#34;keys&amp;#34;:[&amp;#34;/&amp;#34;],&amp;#34;text&amp;#34;:&amp;#34;{0}&amp;#34;}"
                                type="button"
                                className="button-OhqNVIYA button-ptpAHg8E withText-ptpAHg8E button-GwQQdU8S apply-common-tooltip isInteractive-GwQQdU8S accessible-GwQQdU8S"
                                data-name="open-indicators-dialog" data-tooltip="Indicators, metrics, and strategies">
                            <span role="img" className="icon-GwQQdU8S" aria-hidden="true"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"
                                fill="none"><path stroke="currentColor"
                                                  d="M6 12l4.8-4.8a1 1 0 0 1 1.4 0l2.7 2.7a1 1 0 0 0 1.3.1L23 5"></path><path
                                fill="currentColor" fill-rule="evenodd"
                                d="M19 12a1 1 0 0 0-1 1v4h-3v-1a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v2H7a1 1 0 0 0-1 1v4h17V13a1 1 0 0 0-1-1h-3zm0 10h3v-9h-3v9zm-1 0v-4h-3v4h3zm-4-4.5V22h-3v-6h3v1.5zM10 22v-3H7v3h3z"></path></svg></span>
                            <div className="js-button-text text-GwQQdU8S">Indicators</div>
                        </button>
                    </div>
                    <div className="wrap-jiC5bgmi full-jiC5bgmi wrap-n5bmFxyX" id="header-toolbar-study-templates">
                        <button type="button" className="button-merBkM5y apply-common-tooltip accessible-merBkM5y"
                                data-tooltip="Indicator templates" aria-label="Indicator templates"
                                aria-haspopup="menu">
                            <div data-role="button"
                                 className="button-ptpAHg8E withoutText-ptpAHg8E button-GwQQdU8S isInteractive-GwQQdU8S">
                                <span role="img" className="icon-GwQQdU8S" aria-hidden="true"><svg
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                                    fill="currentColor" fill-rule="evenodd"
                                    d="M8 7h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM6 8c0-1.1.9-2 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8zm11-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm-2 1c0-1.1.9-2 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V8zm-4 8H8a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm-3-1a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H8zm9 1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm-2 1c0-1.1.9-2 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3z"></path></svg></span>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="topLayoutGroupSeparator">
                    <div className="separatorBar separator-MBOVGQRI"></div>
                </div>
                <div className="topLayoutGroup">
                    <button aria-label="Create Alert" id="header-toolbar-alerts"
                            data-tooltip-hotkey="{&amp;#34;keys&amp;#34;:[&amp;#34;Alt&amp;#34;,&amp;#34;A&amp;#34;],&amp;#34;text&amp;#34;:&amp;#34;{0} + {1}&amp;#34;}"

                            className="button-OhqNVIYA button-ptpAHg8E withText-ptpAHg8E button-GwQQdU8S apply-common-tooltip isInteractive-GwQQdU8S accessible-GwQQdU8S"
                            data-tooltip="Create Alert"><span role="img" className="icon-GwQQdU8S" aria-hidden="true"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                        fill="currentColor"
                        d="m19.54 4.5 3.96 4.32-.74.68-3.96-4.32.74-.68ZM7.46 4.5 3.5 8.82l.74.68L8.2 5.18l-.74-.68ZM19.74 10.33A7.5 7.5 0 0 1 21 14.5v.5h1v-.5a8.5 8.5 0 1 0-8.5 8.5h.5v-1h-.5a7.5 7.5 0 1 1 6.24-11.67Z"></path><path
                        fill="currentColor" d="M13 9v5h-3v1h4V9h-1ZM19 20v-4h1v4h4v1h-4v4h-1v-4h-4v-1h4Z"></path></svg></span>
                        <div className="js-button-text text-GwQQdU8S">Alert</div>
                    </button>
                    <button aria-label="Bar Replay" id="header-toolbar-replay" aria-pressed="false"
                            type="button"
                            className="button-OhqNVIYA button-ptpAHg8E withText-ptpAHg8E button-GwQQdU8S apply-common-tooltip isInteractive-GwQQdU8S accessible-GwQQdU8S"
                            data-tooltip="Bar Replay"><span role="img" className="icon-GwQQdU8S" aria-hidden="true"><svg
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path fill="none"
                                                                                                            stroke="currentColor"
                                                                                                            d="M13.5 20V9l-6 5.5 6 5.5zM21.5 20V9l-6 5.5 6 5.5z"></path></svg></span>
                        <div className="js-button-text text-GwQQdU8S">Replay</div>
                    </button>
                </div>
                <div className="topLayoutGroupSeparator">
                    <div className="separatorBar separator-MBOVGQRI"></div>
                </div>
                <div className="topLayoutGroup">
                    <div className="wrap-n5bmFxyX" id="header-toolbar-undo-redo">
                        <button
                                className="button-GwQQdU8S apply-common-tooltip isInteractive-GwQQdU8S accessible-GwQQdU8S"
                                aria-label="Undo change series style"
                                data-tooltip-hotkey="{&amp;#34;keys&amp;#34;:[&amp;#34;Ctrl&amp;#34;,&amp;#34;Z&amp;#34;],&amp;#34;text&amp;#34;:&amp;#34;{0} + {1}&amp;#34;}"
                                data-tooltip="Undo change series style"><span role="img"
                                                                              className="icon-GwQQdU8S icon-uMfL97K2"
                                                                              aria-hidden="true"><svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                            fill="currentColor"
                            d="M8.707 13l2.647 2.646-.707.708L6.792 12.5l3.853-3.854.708.708L8.707 12H14.5a5.5 5.5 0 0 1 5.5 5.5V19h-1v-1.5a4.5 4.5 0 0 0-4.5-4.5H8.707z"></path></svg></span>
                        </button>
                        <button  type="button"
                                className="button-GwQQdU8S isDisabled-GwQQdU8S accessible-GwQQdU8S" ><span
                            role="img" className="icon-GwQQdU8S icon-uMfL97K2" aria-hidden="true"><svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                            fill="currentColor"
                            d="M18.293 13l-2.647 2.646.707.708 3.854-3.854-3.854-3.854-.707.708L18.293 12H12.5A5.5 5.5 0 0 0 7 17.5V19h1v-1.5a4.5 4.5 0 0 1 4.5-4.5h5.793z"></path></svg></span>
                        </button>
                    </div>
                </div>

            </div>


            <div className="row">
                <div className="col-lg-1 col-md-12 drawingToolLayout">
                    <div className="drawingTool">
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                    </div>

                </div>

                <div className="col-lg-9 col-md-12 candleStickMain">
                    <div id="candleStickContainer"></div>
                    <div className="card dateTimeintervalContainer">
                        <div className="intervalContainer">
                            {daysButtonData.map((item) => (
                                <button className="intervalButtons"
                                    key={item.value}
                                    onClick={() => updateFromDate(item.value)}>
                                    {item.label}
                                </button>
                            ))}
                            <div className="timeContainer ">{currentTime()} (UTC +5:30)</div>
                        </div>
                    </div>

                    {open && (
                        <SearchDialogForTicker
                            dialogOpen={open}
                            dialogClose={handleClose}
                            onSelectTicker={setSelectedTicker}
                        />
                    )}
                </div>

                <div className="col-lg-1 col-md-12 rightNavigatorLayout">
                    <div className="rightNavigator">
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                        <button className="drawingToolIcon">
                        <span role="img" aria-hidden="true">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><g
                                fill="currentColor"><path d="M18 15h8v-1h-8z"></path><path
                                d="M14 18v8h1v-8zM14 3v8h1v-8zM3 15h8v-1h-8z"></path></g></svg></span>
                        </button>
                    </div>

                </div>
            </div>
        </>
    );
};
