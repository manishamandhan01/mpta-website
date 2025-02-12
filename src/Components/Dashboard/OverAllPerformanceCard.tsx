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
                const top3ProfitsData = overallPerformance['top_3_profits'].map((item: any) => ({
                    name: item[0], // Ticker or symbol
                    y: item[1],    // Profit value
                }));
                const top3LossesData = overallPerformance['top_3_losses'].map((item: any) => ({
                    name: item[0], // Ticker or symbol
                    y: item[1],    // Loss value
                }));

                setTop3Profits(top3ProfitsData);
                setTop3Losses(top3LossesData);
            })
            .catch((err) => console.log(err));
    };

    // Use the effect to call the function on mount
    useEffect(() => {
        overAllPerformanceData();
    }, []); // Dependency array makes sure the effect runs once on mount

    // Highcharts options for the chart
    const chartOptions = {
        chart: {
            type: 'column',
        },
        title: {
            text: 'Top 3 Cumulative Profit & Loss Per Symbol',
        },
        xAxis: {
            categories: [
                ...top3Profits.map((item) => item.name),
                ...top3Losses.map((item) => item.name),
            ],
        },
        yAxis: {
            min: 0,
            title: {
                text: 'Amount ($)',
            },
        },
        series: [
            {
                name: 'Top 3 Profits',
                data: top3Profits.map((item) => item.y),
                color: '#4caf50', // Green for profits
            },
            {
                name: 'Top 3 Losses',
                data: top3Losses.map((item) => item.y),
                color: '#f44336', // Red for losses
            },
        ],
        credits: {
            enabled: false,
        },
        plotOptions: {
            column: {
                borderRadius: 5,
            },
        },
    };

    return (
        <div className="col-xl-3 col-md-6  col-sm-12 " >
            <div className="card-container box-12">
                <div className="dashboard-overall-performance-card">
                    <h1 style={{ fontSize: '30px', fontWeight: 'normal' }}>Overall Performance</h1>
                    <div className="amounts mt-4">
                        <div className="amounts-row">
                            <p>Total Gain</p>
                            <p className="total_gain_row">$</p>
                            <p className="total_gain_row">{totalProfit}</p>
                            <span className="total_gain_row">
                <i className="fa-solid fa-caret-up"></i>
              </span>
                            <p className="total_gain_row">{totalGainPer}%</p>
                        </div>
                        <div className="amounts-row">
                            <p>Total Loss</p>
                            <p className="total_loss_row">$</p>
                            <p className="total_loss_row">{totalLoss}</p>
                            <span className="total_loss_row">
                <i className="fa-solid fa-caret-down"></i>
              </span>
                            <p className="total_loss_row">{totalLossPer}%</p>
                        </div>
                        <div className="amounts-row">
                            <p>Profit/Loss</p>
                            <p className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</p>
                            <p className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>
                                {totalProfitLoss}
                            </p>
                            <span className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>
                <i
                    className={
                        totalProfitLoss >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'
                    }
                ></i>
              </span>
                            <p className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>
                                {totalProfitLossPer}%
                            </p>
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

                    {/* Highcharts Component Integration */}
                    {/*<div id="topCumulativeContainer">*/}
                    {/*    /!* Render Highcharts only when the data is available *!/*/}
                    {/*    {top3Profits.length > 0 && top3Losses.length > 0 ? (*/}
                    {/*        <HighchartsReact highcharts={Highcharts} options={chartOptions} />*/}
                    {/*    ) : (*/}
                    {/*        <p>Loading chart...</p>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                </div>
            </div>
        </div>
    );
};
