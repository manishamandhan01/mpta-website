import Highcharts from "highcharts/highstock";
import {StockDataModel} from "@Components/Models/StockDataModel.tsx";
import React, {useEffect} from "react";

import {SearchDialogForTicker} from "@Components/Charts/SearchDialogForTicker.tsx";



export const CandleChart = ()=>{
    const [stockData, setStockData] = React.useState<StockDataModel[]>([]);
    const currTime = new Date().toLocaleTimeString('en-US', { hour12: false });
    const [open ,setOpen] = React.useState(false);
    const [selectedTicker, setSelectedTicker] = React.useState<string>("selectedTicker");
    const [interval, setInterval] = React.useState<string>("");


    const handleClose = () => {
        setOpen(false);
    }
    const handleInterval = (interval: string)=>{
        setInterval(interval);

    }
    const getFormattedDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const day = String(date.getDate()).padStart(2, '0'); // Add leading zero if single digit
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-indexed, so add 1 and pad with leading zero

        return `${year}-${day}-${month}`;
    };

    const currDate = getFormattedDate();




   const fetchChartData= ()=> {
       fetch(
           `http://localhost:8000/stockapis/v1?format=json&url=v2%2Faggs%2Fticker%2F${selectedTicker}%2Frange%2F1%2Fminute%2F${currDate}%2F${currDate}%3Fadjusted%3Dtrue%26sort%3Dasc%26apiKey%3DvM4IvSPxWHLtSRa5vSYhXhQ70_A1Zr6B`, {
               method: 'GET',
               headers: {
                   'Content-Type': 'application/json',
               },

           })
           .then(res => res.json())
           .then(json => {
               setStockData(json.results);
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

           Highcharts.stockChart("candleStickContainer", {

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
               }],
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
           if (chart){
               const button = chart.renderer.button;
               if(button){
                   button.attr({
                       text:selectedTicker
                   });
               }
           }


       }
   };
    useEffect(() => {
        fetchChartData();
    }, [selectedTicker]);

    return (
        <>
            <div className="card">Top section</div>
            <div className="row">
                <div className="col-lg-1 col-md-12 text-center ">
                    <div className="card drawingTool">Drawing tool</div>
                </div>

                <div className="col-lg-9 col-md-12 candleStickMain">
                    <div id="candleStickContainer"></div>
                    <div className="  card dateTimeintervalContainer">
                        <div className="intervalContainer">
                            <button className="intervalButtons" onClick={()=>handleInterval("1")} >1D</button>
                            <button className="intervalButtons ms-2">5D</button>
                            <button className="intervalButtons ms-2">3M</button>
                            <button className="intervalButtons ms-2">6M</button>
                            <button className="intervalButtons ms-2">1Y</button>
                            <button className="intervalButtons ms-2">5Y</button>
                            <div className="timeContainer">{currTime} (UTC +5:30)</div>
                        </div>


                    </div>

                    {/* Conditionally render the search box */}
                    {open && (
                       <SearchDialogForTicker dialogOpen={open} dialogClose={handleClose} onSelectTicker={setSelectedTicker} />
                    )}
                </div>

                <div className="col-lg-2 col-md-12 text-center ">
                    <div className="card">Stocks</div>
                    <div className="card mt-1">Information</div>
                </div>
            </div>
        </>
    );
};
