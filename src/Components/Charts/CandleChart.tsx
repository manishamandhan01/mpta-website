import Highcharts from "highcharts/highstock";
import {StockDataModel} from "@Components/Models/StockDataModel.tsx";
import React, {useEffect, useRef} from "react";

import {SearchDialogForTicker} from "@Components/Charts/SearchDialogForTicker.tsx";
import {currentTime, formatDate, subtractDaysFromDate} from "@Components/Utils/DateUtil.tsx";
import {
    daysButtonData,
    drawingToolIconsData,
    multiplierButtonData,
    MultiplierTimespanModel
} from "@Components/Charts/CandleChartData.tsx";
import {TickersListModel} from "@Components/Models/TickersListModel.tsx";


export const CandleChart = () => {
    // Load the modules
    // StockToolsModule(Highcharts);
    // AnnotationsModule(Highcharts);
    const [stockData, setStockData] = React.useState<StockDataModel[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedTicker, setSelectedTicker] = React.useState<TickersListModel>({
        "ticker": "X:00USD",
        "name": "00 Token - United States dollar"
    });
    const chartRef = useRef<Highcharts.Chart | null>(null);
    const [fromDate, setFromDate] = React.useState(subtractDaysFromDate(2));
    const [toDate, setToDate] = React.useState(subtractDaysFromDate(1));
    const [multiplierTimespan, setMultiplierTimespan] = React.useState<MultiplierTimespanModel>(
        {
            "label": "1 minute",
            "multiplier": "1",
            "timespan": "minute"
        }
    );

    const fetchChartData = (numberOfDays?: number) => {
        if (numberOfDays !== undefined) {
            const fromDate = subtractDaysFromDate(numberOfDays + 1);
            setFromDate(fromDate);
        }
        fetch(
            `http://localhost:8000/stockapis/v1?format=json&url=v2%2Faggs%2Fticker%2F${selectedTicker.ticker}%2Frange%2F${multiplierTimespan.multiplier}%2F${multiplierTimespan.timespan}%2F${formatDate(fromDate)}%2F${formatDate(toDate)}%3Fadjusted%3Dtrue%26sort%3Dasc%26apiKey%3DvM4IvSPxWHLtSRa5vSYhXhQ70_A1Zr6B`,
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
                // text: `${selectedTicker} Historical`,
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
                        x: 0,
                    },
                    title: {
                        text: "Volume",
                    },
                    top: "65%",
                    height: "35%",
                    offset: 0,
                    lineWidth: 2,
                    startOnTick: false,
                    endOnTick: false
                },
            ],
            tooltip: {
                split: true,
            },
            series: [
                {
                    type: "candlestick",
                    name: selectedTicker.ticker,
                    data: ohlc,
                },
                {
                    type: "column",
                    name: "Volume",
                    data: volume,
                    yAxis: 1,
                }
            ],
            stockTools: {
                gui: {
                    enabled: true // Show the stock tools GUI toolbar
                }
            },
            navigator: {
                enabled: true
            },
            navigation: {
                bindingsClassName: 'highcharts-bindings-container'
            }
            // chart: {
            //     events: {
            //         load: function () {
            //             const chart = this;
            //             chart.renderer.button(selectedTicker.name, 0, 0, function () {})
            //             .attr({
            //                 zIndex: 5
            //             })
            //             .add()
            //             .on('click', function () {setOpen(prevState => !prevState);});
            //         }
            //     }
            // }
        });

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
    }, [multiplierTimespan, fromDate, toDate, selectedTicker]);

    const handleClose = () => setOpen(false);

    const updateMultiplier = (event: React.ChangeEvent<HTMLSelectElement>) => {
        // If you need to access the value from button element
        const newValue = event.currentTarget.value;
        const selectedObj = multiplierButtonData.find((item) => item.label === newValue);
        setMultiplierTimespan(selectedObj); // Update the multiplier state
    };

    const updateFromDate = (numberOfDays: number) => {
        setFromDate(subtractDaysFromDate(numberOfDays + 1));
    }

    return (
        <>
            <div className="layout">
                <div className="layout__area--top d-flex align-items-center">

                    <div className="topLayoutGroup">

                        <button
                            className="text_uppercase search_button_top "
                            onClick={() => setOpen(true)}>

                        <span>
                        <svg
                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 18 18" width="18" height="18"><path
                            fill="currentColor"
                            d="M3.5 8a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM8 2a6 6 0 1 0 3.65 10.76l3.58 3.58 1.06-1.06-3.57-3.57A6 6 0 0 0 8 2Z"></path></svg></span>
                            <div className="js-button-text text-GwQQdU8S text-cq__ntSC">{selectedTicker.name}</div>
                        </button>
                        <button
                            className=" button "
                        >
                            <span role="img" className="icon-GwQQdU8S"
                                  aria-hidden="true"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                                fill="currentColor"
                                d="M13.5 6a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM4 14.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"></path><path
                                fill="currentColor" d="M9 14h4v-4h1v4h4v1h-4v4h-1v-4H9v-1z"></path></svg></span>
                        </button>
                    </div>

                    <div className="topLayoutGroupSeparator">
                        <div className="separatorBar"></div>
                    </div>

                    <div className="topLayoutGroup">
                        <select
                            className="top_interval_button top_buttons"
                            value={multiplierTimespan.multiplier}
                            onChange={updateMultiplier}
                        >
                            {multiplierButtonData.map((item) => (
                                <option key={item.label} value={item.label}>
                                    {item.label}
                                </option>
                            ))}
                        </select>

                    </div>

                    <div className="topLayoutGroupSeparator">
                        <div className="separatorBar"></div>
                    </div>

                    <div className="topLayoutGroup">
                        <div>
                            <button type="button"
                                    className=" top_buttons"
                            >
                                <div>
                                    <span role="img" aria-hidden="true">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                                            height="28"
                                            fill="currentColor"><path fill-rule="evenodd"
                                                                      d="m18.43 15.91 6.96-8.6-.78-.62-6.96 8.6a2.49 2.49 0 0 0-2.63.2l-2.21-2.02A2.5 2.5 0 0 0 10.5 10a2.5 2.5 0 1 0 1.73 4.3l2.12 1.92a2.5 2.5 0 1 0 4.08-.31ZM10.5 14a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3Zm7.5 3.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0Z"></path><path
                                            d="M8.37 13.8c.17.3.4.54.68.74l-5.67 6.78-.76-.64 5.75-6.88Z"></path></svg></span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="topLayoutGroupSeparator">
                        <div className="separatorBar"></div>
                    </div>
                    <div className="topLayoutGroup">
                        <div>
                            <button
                                type="button"
                                className="button"
                            >
                            <span role="img" className="icon-GwQQdU8S" aria-hidden="true">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"
                                    fill="none"><path stroke="currentColor"
                                                      d="M6 12l4.8-4.8a1 1 0 0 1 1.4 0l2.7 2.7a1 1 0 0 0 1.3.1L23 5"></path><path
                                    fill="currentColor" fill-rule="evenodd"
                                    d="M19 12a1 1 0 0 0-1 1v4h-3v-1a1 1 0 0 0-1-1h-3a1 1 0 0 0-1 1v2H7a1 1 0 0 0-1 1v4h17V13a1 1 0 0 0-1-1h-3zm0 10h3v-9h-3v9zm-1 0v-4h-3v4h3zm-4-4.5V22h-3v-6h3v1.5zM10 22v-3H7v3h3z"></path></svg></span>
                                <div className="js-button-text text-GwQQdU8S">Indicators</div>
                            </button>
                        </div>
                        <div>
                            <button type="button" className="top_buttons"
                            >
                                <div>
                                <span role="img" className="icon-GwQQdU8S" aria-hidden="true"><svg
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                                    fill="currentColor" fill-rule="evenodd"
                                    d="M8 7h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zM6 8c0-1.1.9-2 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8zm11-1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1zm-2 1c0-1.1.9-2 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2V8zm-4 8H8a1 1 0 0 0-1 1v3a1 1 0 0 0 1 1h3a1 1 0 0 0 1-1v-3a1 1 0 0 0-1-1zm-3-1a2 2 0 0 0-2 2v3c0 1.1.9 2 2 2h3a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H8zm9 1h3a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-3a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1zm-2 1c0-1.1.9-2 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-3a2 2 0 0 1-2-2v-3z"></path></svg></span>
                                </div>
                            </button>
                        </div>
                    </div>
                    <div className="topLayoutGroupSeparator">
                        <div className="separatorBar"></div>
                    </div>

                    <div className="topLayoutGroup">
                        <button
                            className=" button "
                        >
                            <span role="img" className="icon-GwQQdU8S"
                                  aria-hidden="true"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                                fill="currentColor"
                                d="m19.54 4.5 3.96 4.32-.74.68-3.96-4.32.74-.68ZM7.46 4.5 3.5 8.82l.74.68L8.2 5.18l-.74-.68ZM19.74 10.33A7.5 7.5 0 0 1 21 14.5v.5h1v-.5a8.5 8.5 0 1 0-8.5 8.5h.5v-1h-.5a7.5 7.5 0 1 1 6.24-11.67Z"></path><path
                                fill="currentColor"
                                d="M13 9v5h-3v1h4V9h-1ZM19 20v-4h1v4h4v1h-4v4h-1v-4h-4v-1h4Z"></path></svg></span>
                            <div className=" text_margin_2">Alert</div>
                        </button>

                        <button
                            type="button"
                            className="button"
                        >
                            <span role="img" className="icon-GwQQdU8S" aria-hidden="true"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                                fill="none"
                                stroke="currentColor"
                                d="M13.5 20V9l-6 5.5 6 5.5zM21.5 20V9l-6 5.5 6 5.5z"></path></svg></span>
                            <div>Replay</div>
                        </button>
                    </div>

                    <div className="topLayoutGroupSeparator">
                        <div className="separatorBar"></div>
                    </div>

                    <div className="topLayoutGroup">
                        <div className="top_arrows">
                            <button
                                className="button"
                            >
                                <span role="img"
                                      className="icon-GwQQdU8S icon-uMfL97K2"
                                      aria-hidden="true"><svg
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                                    fill="currentColor"
                                    d="M8.707 13l2.647 2.646-.707.708L6.792 12.5l3.853-3.854.708.708L8.707 12H14.5a5.5 5.5 0 0 1 5.5 5.5V19h-1v-1.5a4.5 4.5 0 0 0-4.5-4.5H8.707z"></path></svg></span>
                            </button>

                            <button type="button"
                                    className="button"><span
                                role="img" className="icon-GwQQdU8S icon-uMfL97K2" aria-hidden="true"><svg
                                xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28"><path
                                fill="currentColor"
                                d="M18.293 13l-2.647 2.646.707.708 3.854-3.854-3.854-3.854-.707.708L18.293 12H12.5A5.5 5.5 0 0 0 7 17.5V19h1v-1.5a4.5 4.5 0 0 1 4.5-4.5h5.793z"></path></svg></span>
                            </button>
                        </div>
                    </div>

                </div>

                <div className="layout__area--left">
                    <div className="drawingToolLayout">
                        <div className="drawingTool">
                            {drawingToolIconsData.map((icon) => (
                                <div className="drawingToolIconWrapper" key={icon.id}>
                                    <button className="drawingToolIcon">
                                        <span role="img" aria-hidden="true">
                                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28"
                                               height="28">
                                            <g fill="currentColor">
                                              {icon.paths.map((d, index) => (
                                                  <path d={d} key={index}></path>
                                              ))}
                                            </g>
                                          </svg>
                                        </span>
                                    </button>
                                </div>
                            ))}


                        </div>

                    </div>
                </div>


                <div className="layout__area--center">
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
                    <div className="layout__area--right">

                    </div>

                </div>
            </div>
        </>
    );
};
