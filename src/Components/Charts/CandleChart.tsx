import Highcharts from "highcharts/highstock";
import {StockDataModel} from "@Components/Models/StockDataModel.tsx";
import React from "react";


export const CandleChart = ()=>{
    const [stockData, setStockData] = React.useState<StockDataModel[]>([]);
    // const currDate = new Date().toLocaleDateString();
    const currTime = new Date().toLocaleTimeString('en-US', { hour12: false });

    fetch(
            'http://localhost:8000/stockapis/candle_stick_chart/get_results?format=json' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify("")

            })
            .then(res => res.json())
            .then(json => {
                setStockData(json["data"].data);
                bindHighChart();
            })
            .catch(err => console.log(err));

    function bindHighChart() {
        // split the data set into ohlc and volume
        const ohlc = [],
            volume = [],
            dataLength = stockData.length,
            // set the allowed units for data grouping
            groupingUnits = [[
                'week',                         // unit name
                [1]                             // allowed multiples
            ], [
                'month',
                [1, 2, 3, 4, 6]
            ]];

        for (let i = 0; i < dataLength; i += 1) {
            ohlc.push([
                stockData[i].date,
                stockData[i].open,
                stockData[i].high,
                stockData[i].low,
                stockData[i].close
            ]);

            volume.push([
                stockData[i].date,
                stockData[i].volume
            ]);
        }

// create the chart
        // @ts-expect-error : Should expect string

        Highcharts.stockChart("candleStickContainer",{

            rangeSelector: {
                selected: 4
            },

            title: {
                text: 'AAPL Historical'
            },

            yAxis: [{
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'OHLC'
                },
                height: '60%',
                lineWidth: 2,
                resize: {
                    enabled: true
                }
            }, {
                labels: {
                    align: 'right',
                    x: -3
                },
                title: {
                    text: 'Volume'
                },
                top: '65%',
                height: '35%',
                offset: 0,
                lineWidth: 2
            }],

            tooltip: {
                split: true
            },

            series: [{
                type: 'candlestick',
                name: 'AAPL',
                data: ohlc,
                dataGrouping: {
                    units: groupingUnits
                }
            }, {
                type: 'column',
                name: 'Volume',
                data: volume,
                yAxis: 1,
                dataGrouping: {
                    units: groupingUnits
                }
            }]
        })



    }



    return (
        <>
            <div className="card">Top section</div>
            <div className="row">
                <div className="col-lg-1 col-md-12 text-center ">
                    <div className="card drawingTool">Drawing tool</div>
                </div>

                <div className="col-lg-9 col-md-12 candleStickMain">
                    <div  id="candleStickContainer"></div>
                    <div className="card dateTimeContainer">{currTime} (UTC +5:30)</div>
                    {/* DateTime below candleStickContainer */}
                </div>

                <div className="col-lg-2 col-md-12 text-center ">
                    <div className="card">Stocks</div>
                    <div className="card mt-1">Information</div>
                </div>
            </div>


        </>
    )

};
