import Highcharts from "highcharts/highstock";
import { StockDataModel } from "@Components/Models/StockDataModel.tsx";
import React, { useEffect, useRef } from "react";

import { SearchDialogForTicker } from "@Components/Charts/SearchDialogForTicker.tsx";

export const CandleChart = () => {
    const [stockData, setStockData] = React.useState<StockDataModel[]>([]);
    const [open, setOpen] = React.useState(false);
    const [selectedTicker, setSelectedTicker] = React.useState<string>("AAPL");
    const currTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    const chartRef = useRef<Highcharts.Chart | null>(null);

    const handleClose = () => setOpen(false);

    const getCurrentDate = () => {
        const today = new Date();
        today.setDate(today.getDate() - 1);
        return today.toISOString().split("T")[0];
    };

    const getNDaysPreviousDate = (n: number) => {
        const today = new Date();
        today.setDate(today.getDate() - n);
        return today.toISOString().split("T")[0];
    };

    const currentDateMinusOneDate = getNDaysPreviousDate(1);
    const currentDateMinusTwoDate = getNDaysPreviousDate(2);

    const fetchChartData = () => {
        fetch(
            `http://localhost:8000/stockapis/v1?format=json&url=v2%2Faggs%2Fticker%2F${selectedTicker}%2Frange%2F1%2Fminute%2F${currentDateMinusTwoDate}%2F${currentDateMinusOneDate}%3Fadjusted%3Dtrue%26sort%3Dasc%26apiKey%3DvM4IvSPxWHLtSRa5vSYhXhQ70_A1Zr6B`,
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
        fetchChartData();
    }, [selectedTicker]);

    useEffect(() => {
        if (stockData.length > 0) {
            bindHighChart(stockData);
        }
    }, [stockData]);

    return (
        <>
            <div className="card">Top section</div>
            <div className="row">
                <div className="col-lg-1 col-md-12 text-center">
                    <div className="card drawingTool">Drawing tool</div>
                </div>

                <div className="col-lg-9 col-md-12 candleStickMain">
                    <div id="candleStickContainer"></div>
                    <div className="card dateTimeintervalContainer">
                        <div className="intervalContainer">
                            <button className="intervalButtons">1D</button>
                            <button className="intervalButtons ms-2">5D</button>
                            <button className="intervalButtons ms-2">3M</button>
                            <button className="intervalButtons ms-2">6M</button>
                            <button className="intervalButtons ms-2">1Y</button>
                            <button className="intervalButtons ms-2">5Y</button>
                            <div className="timeContainer">{currTime} (UTC +5:30)</div>
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

                <div className="col-lg-2 col-md-12 text-center">
                    <div className="card">Stocks</div>s
                    <div className="card mt-1">Information</div>
                </div>
            </div>
        </>
    );
};
