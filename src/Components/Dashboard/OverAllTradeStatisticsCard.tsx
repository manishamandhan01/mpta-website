import * as React from 'react';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import HighchartsMore from 'highcharts/highcharts-more'; // Importing highcharts-more

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
            method: 'POST',
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

    // Dynamically create the Highcharts options based on winRatePercent and profitRatePercent
    // Pie chart for win rate percentage
    const winRateChartOptions = {
        chart: {
            type: 'pie',
            height: 180, // Set height for smaller pie chart size
            width: 180, // Set width for smaller pie chart size

        },
        title: {
            text: '',
        },
        tooltip: {},
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y}%', // Show name and percentage value
                    style: {
                        color: 'black', // Text color for data labels
                        fontWeight: 'bold', // Make text bold
                        fontSize: '14px', // Font size of data labels

                    },
                    distance: -105, // Place the data label closer to the center
                },
                shadow: {
                    color: 'rgba(0.5, 0.8, 0.7, 0.5)', // Shadow color (semi-transparent black)
                    offsetX: 10, // Horizontal offset of the shadow
                    offsetY: 4, // Vertical offset of the shadow
                    opacity: 0.1, // Transparency of the shadow
                    blur: 1, // Blur radius for the shadow
                },
            },
        },
        series: [
            {
                name: 'Trade Statistics',
                colorByPoint: true,
                innerSize: '80%',
                data: [
                    {
                        name: 'Win Rate',
                        y: winRatePercent,
                        color: '#28a745', // Green for win rate
                    },
                    {
                        name: 'Loss Rate',
                        y: 100 - winRatePercent,
                        color: '#B4B4B4', // Red for loss rate
                        dataLabels: {
                            enabled: false, // Hide text for Non profit Rate
                        },
                    },
                ],
            },
        ],
    };

// Pie chart for profit rate percentage
    const profitRateChartOptions = {
        chart: {
            type: 'pie',
            height: 180, // Set height for smaller pie chart size
            width: 180, // Set width for smaller pie chart size
        },
        title: {
            text: '', // Remove default title
        },
        tooltip: {},
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y}%', // Show name and percentage value
                    style: {
                        color: 'black', // Text color for data labels
                        fontWeight: 'bold', // Make text bold
                        fontSize: '14px', // Font size of data labels
                    },
                    distance: -105, // Place the data label closer to the center
                },
                shadow: {
                    color: 'rgba(0.5, 0.8, 0.7, 0.5)', // Shadow color (semi-transparent black)
                    offsetX: 10, // Horizontal offset of the shadow
                    offsetY: 4, // Vertical offset of the shadow
                    opacity: 0.1, // Transparency of the shadow
                    blur: 1, // Blur radius for the shadow
                },
            },
        },
        annotations: [{
            labels: [{
                point: {
                    x: '100%', // X position (center of the pie)
                    y: '100%', // Y position (center of the pie)
                },
                text: 'Profit Rate: ' + profitRatePercent + '%',
                style: {
                    fontSize: '14px', // Font size
                    fontWeight: 'bold', // Bold text
                    color: 'black', // Text color
                    textAlign: 'center', // Center the text horizontally
                    verticalAlign: 'middle', // Center the text vertically
                }
            }]
        }],
        series: [
            {
                name: 'Trade Statistics',
                colorByPoint: true,
                innerSize: '80%',
                data: [
                    {
                        name: 'Profit Rate',
                        y: profitRatePercent,
                        color: '#28a745', // Green for profit rate
                    },
                    {
                        name: 'Non profit Rate',
                        y: 100 - profitRatePercent,
                        color: '#B4B4B4', // Gray for non-profit rate
                        dataLabels: {
                            enabled: false, // Hide text for Non profit Rate
                        },
                    },
                ],
            },
        ],
    };




    return (
        <div className="col-xl-3 col-md-6 col-sm-12">
            <div className="card-container box-12">

                <div className="dashboard-overall-trade-statistics-card">
                    <h1 className="linear-gradient-headings">Overall Trade Statistics</h1>

                    <div className="row mt-4">
                        {/* First pie chart (Win Rate) */}
                        <div className="col-6">
                            <HighchartsReact highcharts={Highcharts} options={winRateChartOptions}/>
                        </div>

                        {/* Second pie chart (Profit Rate) */}
                        <div className="col-6 profit_Rate ">
                            <HighchartsReact highcharts={Highcharts} options={profitRateChartOptions}/>
                        </div>
                    </div>

                    <div className="d-flex justify-content-between text-center mt-5">
                        <div className="lh-lg">
                            <div><p className="text-success font-bold">{winTrades}</p></div>
                            <div><p>Win Trades</p></div>
                            <div><p className="text-success font-bold">{averageWinPercent}%</p></div>
                            <div><p>Ave.Win%</p></div>
                            <div><p>Profit Factor</p></div>
                        </div>

                        <div className="lh-lg">
                            <div><p className="text-danger font-bold">{lossTrades}</p></div>
                            <div><p>Loss Trades</p></div>
                            <div><p className="text-danger font-bold">{averageLossPercent}%</p></div>
                            <div><p>Ave.Loss%</p></div>
                            <div><p>{profitFactor}</p></div>
                        </div>

                        <div className="lh-lg">
                            <div><p className="text-success font-bold">{averageProfit}</p></div>
                            <div><p>Avg Profit</p></div>
                            <div><p className="text-success font-bold">{winLossRatio}</p></div>
                            <div><p>W/L Ratio</p></div>
                            <div><p>Expectancy</p></div>
                        </div>

                        <div className="lh-lg">
                            <div><p className="text-danger font-bold">{averageLoss}</p></div>
                            <div><p>Avg Loss</p></div>
                            <div><p className="text-success font-bold">{profitLossRatio}</p></div>
                            <div><p>P/L Ratio</p></div>
                            <div className={expectancyPerTrade > 0 ? "text-success" : "text-danger"}>
                                <p>{expectancyPerTrade}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Highcharts component for the pie chart */}

        </div>
    );
};
