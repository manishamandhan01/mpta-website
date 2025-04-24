// @flow
import * as React from 'react';
import {useEffect} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useTradeResults, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type Props = {};

export const DrawnAndLosingStreak = (props: Props) => {
    const {tradeRows} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();
    const [cardData, setCardData] = React.useState<any | null>(null);
    const [totalProfit, setTotalProfit] = React.useState(0);
    const [totalLoss, setTotalLoss] = React.useState(0);
    const [totalGainPer, setTotalGainPer] = React.useState(0);
    const [totalLossPer, setTotalLossPer] = React.useState(0);
    const [totalProfitLoss, setTotalProfitLoss] = React.useState(0);
    const [totalProfitLossPer, setTotalProfitLossPer] = React.useState(0);
    const [top3Profits, setTop3Profits] = React.useState<any[]>([]);
    const [top3Losses, setTop3Losses] = React.useState<any[]>([]);


    // Define the function to fetch the overall performance data
    const overAllPerformanceData = () => {
        // Make the API call on mount
        fetchTradeResults()
            .then((json) => {
                const overallPerformance = json['overall_performance'];
                setTotalProfit(overallPerformance['total_gain']);
                setTotalLoss(overallPerformance['total_loss']);
                setTotalGainPer(overallPerformance['total_gain_percent']);
                setTotalLossPer(overallPerformance['total_loss_percent']);
                setTotalProfitLoss(overallPerformance['overall_total_gain_loss']);
                setTotalProfitLossPer(overallPerformance['overall_total_gain_loss_percent']);
                setTop3Profits(overallPerformance['top_3_profits']);
                setTop3Losses(overallPerformance['top_3_losses']);

            })
            .catch((err) => console.log(err));
    };

    // Use the effect to call the function on mount
    useEffect(() => {
        overAllPerformanceData();
    }, []); // Dependency array makes sure the effect runs once on mount

    const profitNames = top3Profits.map((item) => item[0]);
    const profitValues = top3Profits.map((item) => item[1].pnl);
    const lossNames = top3Losses.map((item) => item[0]);
    const lossValues = top3Losses.map((item) => item[1].pnl);

    // Highcharts options for the chart
    const chartOptions = {
        chart: {
            type: 'bar',
            height:300,
        },
        title: {
            text: 'Top 3 Cumulative Profits and Losses',
            style: {
                fontSize: '15px',  fontWeight:'normal'
            }
        },
        xAxis: {

            categories:  [...profitNames, ...lossNames],
            gridLineWidth: 0,
        },
        yAxis: {
            title: {
                text: '',

            },
            min: -20000,  // Set the minimum value for the Y-axis
            max: 70000,
            reversed: false,
            labels:{
                enabled:false,
            }// Set the maximum value for the Y-axis
        },
        series: [{
            name: 'Profits',
            data: profitValues,  // Positive values for profits
            color: 'green',
            dataLabels: {
                enabled: true,
                color: 'black',
                align: 'center',
                format: '{point.y}',
                style:{fontWeight:'bold'}// Display value on the bar
            }
        }, {
            name: 'Losses',
            data: lossValues,  // Negative values for losses
            color: 'red',
            dataLabels: {
                enabled: true,
                color: 'black',
                align: 'right',
                format: '{point.y}',
                style: {
                    fontWeight: 'bold',
                },
                allowOverlap: false, // Ensures negative labels aren't hidden
                verticalAlign: 'middle', // Display value on the bar
            }
        }]
    };


    return (
        <div className="col-xl-4 col-md-6 col-sm-12 ms-5 mb-5">
            <div className=" box-12">
                <div className="dashboard-overall-performance-card">
                    <div className="main_heading_card"><h1
                        className="font_poppins heading-20 line_height_32 font_weight_400 mt-5 ">DrawDown And Losing Streaks
                        Performance</h1>
                    </div>
                    <div className="main_heading_card">
                        <hr/>

                    </div>
                    <div className="amounts mt-4">
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
