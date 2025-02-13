// @flow
import * as React from 'react';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {};

export const OverAllPerformanceCard = (props: Props) => {
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
        fetch('http://localhost:8000/dashboard/overall_performance/get_results?format=json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
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
        <div className="col-xl-3 col-md-6  col-sm-12 " >
            <div className="card-container box-12">
                <div className="dashboard-overall-performance-card">
                    <h1 className="font_weight_200" style={{fontSize: '30px', fontWeight: 'normal'}}>Overall Performance</h1>
                    <div className="amounts mt-4">

                        <div className="d-flex justify-content-between text-center mt-4 ">
                            <div className="lh-lg">
                                <div><p>Total Gain</p></div>
                                <div><p>Total Loss</p></div>
                                <div><p>Profit/Loss</p></div>

                            </div>

                            <div className="lh-lg">
                                <div><p className="total_gain_row">$</p></div>
                                <div><p className="total_loss_row">$</p></div>
                                <div><p className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</p>
                                </div>


                            </div>

                            <div className="lh-lg">
                                <div><p className="total_gain_row">{totalProfit}</p></div>
                                <div><p className="total_loss_row">{totalLoss}</p></div>
                                <div><p
                                    className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>{totalProfitLoss}</p>
                                </div>

                            </div>
                            <div className="lh-lg">
                                <div><p className="total_gain_row"><i className="fa-solid fa-caret-up"></i></p></div>
                                <div><p className="total_loss_row"><i className="fa-solid fa-caret-down"></i></p></div>
                                <div><p className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}><i
                                    className={
                                        totalProfitLoss >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'
                                    }
                                ></i></p>
                                </div>

                            </div>
                            <div className="lh-lg">
                                <div><p className="total_gain_row">{totalGainPer}%</p></div>
                                <div><p className="total_loss_row">{totalLossPer}%</p></div>
                                <div><p
                                    className={totalProfitLoss >= 0 ? 'total_gain_row ' : 'total_loss_row'}>{totalProfitLossPer}%</p>
                                </div>


                            </div>

                        </div>
                        <div
                            className="profit-loss-bar"
                            style={{
                                background: `linear-gradient(to right, green ${totalGainPer}%, red ${totalLossPer}%)`,
                                width: '100%',
                                height: '20px',
                                borderRadius: '1px',
                                marginTop: '20px',
                            }}
                        ></div>
                    </div>



                    <div id="overAllPerformanceChart">
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
