import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from "react";
import { OverAllPerformanceModel } from "@Components/Models/OverAllPerformanceModel.tsx";
import {useTradeResults, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type Props = {};

export const DistributionGainLossBar = (props: Props) => {
    const {tradeRows} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();
    const [cardData, setCardData] = React.useState<OverAllPerformanceModel | null>(null);
    const [gainAndLoss, setGainAndLoss] = React.useState<any>(null); // Store gain/loss distribution data

    const DistributionGainLossBar = () => {
        // Make the API call on mount
        fetchTradeResults()
            .then(json => {
                const gain_loss_distribution = json['gain_loss_distribution'];
                setGainAndLoss(gain_loss_distribution); // Set the gain/loss distribution data
            })
            .catch(err => console.log(err));
    };

    // Fetch data on mount or when cardData changes
    useEffect(() => {
        DistributionGainLossBar();
    }, []);

    const chartOptions = {
        chart: {
            type: 'column'
        },
        title: {
            text: '',
            style: {
                fontSize: '30px',
                fontWeight: "font_weight_200",
                textAlign:'center',
            }
        },
        xAxis: {
            type: 'category',
            labels: {
                autoRotation: [-45, -90],
                style: {
                    fontSize: '10px',
                    fontFamily: 'Verdana, sans-serif'
                }
            }
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Number Of Trades'
            },

        },

        legend: {
            enabled: true
        },
        tooltip: {
            pointFormat: '<b>Number Of Trades</b>'
        },
        series: [{
            name: '%Gains/Losses',
            colorByPoint: true,  // Allow individual coloring
            groupPadding: 0,
            data: gainAndLoss ? Object.entries(gainAndLoss).map(([label, value]: [string, number]) => {
                // Determine the color based on the label range
                const percentageRange = label.split(" ")[0]; // Get the first part of the label, e.g., "0%" from "0% to 2%"
                const percentageValue = parseFloat(percentageRange.replace('%', '')); // Convert the percentage string to a number

                // Color the bar red if percentage is below 10%, green if it's 10% or more
                const color = percentageValue < 0 ? '#dc3545' : '#28a745';

                return {
                    name: label,
                    y: value,
                    color: color // Set color based on percentage range
                };
            }) : [],
            dataLabels: {
                enabled: true,
                rotation: 0,
                color: '#FFFFFF',
                inside: true,
                verticalAlign: 'top',
                format: '{point.y}', // One decimal
                style: {
                    fontSize: '13px',
                    fontFamily: 'Verdana, sans-serif'
                },
                y:-25,
            }
        }]
    };

    return (
        <div className="col-xl-10 col-lg-6 col-md-6 col-sm-12">
            <div className=" ">
                <div className="main_heading_card"><h1 className="font_poppins heading-20 line_height_32 font_weight_400 mt-5 ">Distribution Of Gains
                    And Losses</h1></div>
                <div className="main_heading_card">
                    <hr/>

                </div>


                <div className="dashboard-overall-performance-card">


                <div className="dashboard-card-gain-loss">

                        <HighchartsReact
                            highcharts={Highcharts}
                            options={chartOptions}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
