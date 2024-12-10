import Highcharts from "highcharts/highstock";
import {StockDataModel} from "@Components/Models/StockDataModel.tsx";
import React from "react";
import {PositionCalculatorResultModel} from "@Components/Models/PositionCalculatorResultModel.tsx";
import {CPSResultModel} from "@Components/Utils/Constants.tsx";


export const CandleChart = ()=>{
    const [stockData, setStockData] = React.useState<StockDataModel[]>();
    fetch(
            'http://localhost:8000/charts/charts/get_results?format=json' , {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)

            })
            .then(res => res.json())
            .then(json => {
                setStockData(json["data"]);

            })
            .catch(err => console.log(err));



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

    })();


    return (
<div className="card" >
        <div  id="candleStickContainer"></div></div>
    )
}// src/components/HighchartsComponent.tsx

