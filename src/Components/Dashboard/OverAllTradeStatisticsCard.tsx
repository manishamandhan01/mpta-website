import * as React from 'react';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import {green, red} from "@mui/material/colors";

type Props = {};

export const OverAllTradeStatisticsCard = (props: Props) => {
    const [winRatePercent, setWinRatePercent] = React.useState(0);
    const [profitRatePercent, setProfitRatePercent] = React.useState(0);
    const [winTrades, setWinTrades] = React.useState(0);
    const [lossTrades, setLossTrades] = React.useState(0);
    const [averageProfit, setAverageProfit] = React.useState(0);
    const [averageLoss, setAverageLoss] = React.useState(0);
    const [averageWinPercent, setAverageWinPercent] = React.useState(0);
    const [averageLossPercent, setAverageLossPercent] = React.useState(0);
    const [winLossRatio, setWinLossRatio] = React.useState(0);
    const [profitLossRatio, setProfitLossRatio] = React.useState(0);
    const [profitFactor, setProfitFactor] = React.useState(0);
    const [expectancyPerTrade, setExpectancyPerTrade] = React.useState(0);

    // Fetching data
    const overAllPerformanceData = () => {
        fetch('http://localhost:8000/dashboard/overall_performance/get_results?format=json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then(res => res.json())
            .then(json => {
                const overall_trade_statistics = json['overall_trade_statistics'];
                const trade_statistics = json['trade_statistics'];
                setWinRatePercent(overall_trade_statistics['win_rate_percentage']);
                setProfitRatePercent(overall_trade_statistics['profit_rate_percentage']);
                setWinTrades(overall_trade_statistics['win_trades_count']);
                setLossTrades(overall_trade_statistics['loss_trades_count']);
                setAverageProfit(overall_trade_statistics['average_profit']);
                setAverageLoss(overall_trade_statistics['average_loss']);
                setAverageWinPercent(overall_trade_statistics['average_win_percentage']);
                setAverageLossPercent(overall_trade_statistics['average_loss_percentage']);
                setWinLossRatio(overall_trade_statistics['win_to_loss_ratio']);
                setProfitLossRatio(overall_trade_statistics['profit_to_loss_ratio']);
                setProfitFactor(trade_statistics['profit_factor']);
                setExpectancyPerTrade(trade_statistics['expectancy_per_trade']);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        overAllPerformanceData();
    }, []);


    // Creating a pie chart for Win Rate
    useEffect(() => {
        if (winRatePercent > 0) {
            Highcharts.chart('pie_container1', {
                chart: {
                    type: 'pie',
                },
                title: {
                    text: '',
                },
                subtitle: {
                    text: '',
                },
                series: [
                    {
                        name: 'Rate Percentage',
                        data: [
                            {
                                name: 'Win Rate',
                                y: winRatePercent,

                                linearGradient: [red,green],  // Gradient direction from top-left to bottom-right

                            },

                        ],
                        innerSize: '80%',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}%',
                            style: {
                                fontSize: '16px',
                            },
                        },
                    },
                ],
            });
        }
    }, [winRatePercent]); // Re-render chart when winRatePercent updates

    // Creating a pie chart for Profit Rate
    useEffect(() => {
        if (profitRatePercent > 0) {
            Highcharts.chart('pie_container2', {
                chart: {
                    type: 'pie',
                },
                title: {
                    text: '',
                },
                subtitle: {
                    text: '',
                },
                series: [
                    {
                        name: 'Rate Percentage',
                        data: [
                            {
                                name: 'Profit Rate',
                                y: profitRatePercent,
                                color : green[500],
                            },


                        ],
                        innerSize: '80%',
                        dataLabels: {
                            enabled: true,
                            format: '{point.name}: {point.y}%',
                            style: {
                                fontSize: '16px',

                            },
                        },
                    },
                ],
            });
        }
    }, [profitRatePercent]); // Re-render chart when profitRatePercent updates

    return (
        <div className="col-xl-3 col-sm-12 " >
            <div className="card-container box-12 ">
                <div className="dashboard-overall-trade-statistics-card">
                    <h1 style={{
                        fontSize: "30px",
                        fontWeight: "normal"
                    }}>Overall Trade Statistics</h1>
                    <div className="chart-container d-flex justify-content-center">
                        <div id="pie_container1" className="pie-chart"></div>
                        <div id="pie_container2" className="pie-chart"></div>
                    </div>
                    <div className="d-flex justify-content-between text-center mt-0">


                        <div className="lh-lg">
                            <div><p className="text-success font-bold">{winTrades}</p></div>
                            <div><p>Win Trades</p></div>
                            <div><p className="text-success font-bold   ">{averageWinPercent}%</p>
                            </div>
                            <div><p>Ave.Win%</p></div>
                            <div><p>Profit Factor</p></div>

                        </div>

                        <div className="lh-lg">
                            <div><p className="text-danger font-bold">{lossTrades}</p></div>
                            <div><p>Loss Trades</p></div>
                            <div><p className="text-danger  font-bold   ">{averageLossPercent}%</p>
                            </div>
                            <div><p>Ave.Loss%</p></div>
                            <div><p>{profitFactor}</p></div>

                        </div>
                        <div className="lh-lg">
                            <div><p className="text-success font-bold">{averageProfit}</p></div>
                            <div><p>Avg Profit</p></div>
                            <div><p className="text-success font-bold   ">{winLossRatio}</p>
                            </div>
                            <div><p>W/L Ratio</p></div>
                            <div><p>Expectancy</p></div>

                        </div>
                        <div className="lh-lg">
                            <div><p className="text-danger  font-bold">{averageLoss}</p></div>
                            <div><p>Avg Loss</p></div>
                            <div><p className="text-success font-bold   ">{profitLossRatio}</p>
                            </div>
                            <div><p>P/L Ratio</p></div>
                            <div className={expectancyPerTrade > 0 ? "text-success" : "text-danger"}>
                                <p>{expectancyPerTrade}</p>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        </div>

    );
};
