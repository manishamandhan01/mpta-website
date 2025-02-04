// @flow
import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useEffect} from "react";
import {OverAllPerformanceModel} from "@Components/Models/OverAllPerformanceModel.tsx";

type Props = {
};

export const GainLossBar = (props: Props) => {
    const [cardData, setCardData] = React.useState<OverAllPerformanceModel | null>(null);
    const [totalGainPer, setTotalGainPer] = React.useState(0);
    const [totalLossPer, setTotalLossPer] = React.useState(0);

    const gainLossBar = () => {
        // Make the API call on mount
        fetch('http://localhost:8000/dashboard/overall_performance/get_results?format=json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(cardData) // Card data for the request
        })
            .then(res => res.json())
            .then(json => {
                setTotalGainPer(json["total_profit_percentage"]);
                setTotalLossPer(json["total_loss_percentage"]);
            })
            .catch(err => console.log(err));
    };

    // Use the effect to call the function on mount or when cardData changes
    useEffect(() => {
        gainLossBar();
    }, [cardData]); // Depend
    const chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: 'Distribution Of Gain/Losses',style:{
        fontSize: '30px',
            fontWeight: "normal"
        }},
        // subtitle: {
        //     text: 'Source: <a href="https://worldpopulationreview.com/world-cities" target="_blank">World Population Review</a>'
        // },
        xAxis: {
            type: 'category',
            labels: {
                autoRotation: [-45, -90],
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number Of Trades'
            }
        },
        legend: {
            enabled: false
        },
        tooltip: {
            pointFormat: '<b>Number Of Trades</b>'
        },
        series: [{
            name: 'Population',
            colors: [
                '#9b20d9', '#9215ac', '#861ec9', '#7a17e6', '#7010f9', '#691af3',
                '#6225ed', '#5b30e7', '#533be1', '#4c46db', '#4551d5', '#3e5ccf',
                '#3667c9', '#2f72c3', '#277dbd', '#1f88b7', '#1693b1', '#0a9eaa',
                '#03c69b',  '#00f194'
            ],
            colorByPoint: true,
            groupPadding: 0,
            data: [
                ['Tokyo', 37.33],
                ['Delhi', 31.18],
                ['Shanghai', 27.79],
                ['Sao Paulo', 22.23],
                ['Mexico City', 21.91],
                ['Dhaka', 21.74],
                ['Cairo', 21.32],
                ['Beijing', 20.89],
                ['Mumbai', 20.67],
                ['Osaka', 19.11],
                ['Karachi', 16.45],
                ['Chongqing', 16.38],
                ['Istanbul', 15.41],
                ['Buenos Aires', 15.25],
                ['Kolkata', 14.974],
                ['Kinshasa', 14.970],
                ['Lagos', 14.86],
                ['Manila', 14.16],
                ['Tianjin', 13.79],
                ['Guangzhou', 13.64]
            ],
            dataLabels: {
                enabled: true,
                rotation: -10,
                color: '#FFFFFF',
                inside: true,
                verticalAlign: 'top',
                format: '{point.y:.1f}', // one decimal
                y: 10, // 10 pixels down from the top
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        }]
    };

    return (
        <div>
            <div className="card-container-gain-loss-highchart">
                <div className="dashboard-gain-loss-highchart">
                    <HighchartsReact
                        highcharts={Highcharts}
                        options={chartOptions}
                    />
                </div>
            </div>
            </div>
            );
            };
