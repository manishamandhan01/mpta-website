import * as React from 'react';
import { useEffect } from "react";
import {PerformancePeriod, QuarterlyPnl} from "@Components/Utils/Constants.tsx";





type Props = {};

export const TradeStatistics = (props: Props) => {

    const [winRatePercentage, setWinRatePercentage] = React.useState(0);
    const [largestProfit, setLargestProfit] = React.useState(0);
    const [largestLoss, setLargestLoss] = React.useState(0);
    const [largestWinPercentage, setLargestWinPercentage] = React.useState(0);
    const [largestLossPercentage, setLargestLossPercentage] = React.useState(0);
    const [averageWinPercentage, setAverageWinPercentage] = React.useState(0);
    const [averageLossPercentage, setAverageLossPercentage] = React.useState(0);
    const [rewardToRiskRatio, setRewardToRiskRatio] = React.useState(0);
    const [profitLossRatio, setProfitLossRatio] = React.useState(0);
    const [profitFactor, setProfitFactor] = React.useState(0);
    const [expectancyPerTrade, setExpectancyPerTrade] = React.useState(0);
    const [lastFiftyTrades, setLastFiftyTrades] = React.useState(50.45);
    const [changePercentage, setChangePercentage] = React.useState("17%");


    // Fetch data from the backend and update the state
    const fetchTradeStatistics = () => {
        fetch('http://localhost:8000/dashboard/overall_performance/get_results?format=json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const trade_statistics = json['trade_statistics'];
                setWinRatePercentage(trade_statistics.win_rate_percentage);
                setLargestProfit(trade_statistics.largest_profit);
                setLargestLoss(trade_statistics.largest_loss);
                setLargestWinPercentage(trade_statistics.largest_win_percentage);
                setLargestLossPercentage(trade_statistics.largest_loss_percentage);
                setAverageWinPercentage(trade_statistics.average_win_percentage);
                setAverageLossPercentage(trade_statistics.average_loss_percentage);
                setRewardToRiskRatio(trade_statistics.reward_to_risk_ratio);
                setProfitLossRatio(trade_statistics.profit_loss_ratio);
                setProfitFactor(trade_statistics.profit_factor);
                setExpectancyPerTrade(trade_statistics.expectancy_per_trade);

            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchTradeStatistics();
    }, []);

    // Function to round numbers to 2 decimal places


    return (
        <div className="col-xl-6 col-md-6 col-sm-12">
            <div className="card-container box-12">
                <div className="dashboard-overall-performance-card">


                <h1 className="linear-gradient-headings">
                    Trade Statistics
                </h1>
                <div className="amounts">

                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                        <thead>
                        <tr>
                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Metrics</th>
                            <th className="font_Epilogue" style={{fontSize: '15px'}}></th>
                            <th className="font_Epilogue" style={{fontSize: '15px'}}>All Trades Stats</th>
                            <th className="font_Epilogue" style={{fontSize: '15px'}}></th>
                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Last 50 Trades</th>
                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Remarks</th>
                            <th className="font_Epilogue" style={{fontSize: '15px'}}>Change %</th>

                        </tr>
                        </thead>
                        <tbody>
                        <tr className="background_grey_color">
                            <td >Win rate %:</td>
                            <td></td>
                            <td className={winRatePercentage > 0 ? 'total_gain_row' : 'total_loss_row'}>{winRatePercentage}</td>
                            <td></td>
                            <td className={lastFiftyTrades > 0 ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades}</td>
                            <td className={lastFiftyTrades > winRatePercentage ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > winRatePercentage ? "Improved" : "Declined"}<i
                                className={lastFiftyTrades > winRatePercentage ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                            </td>
                            <td className={lastFiftyTrades > winRatePercentage ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        <tr>
                            <td>Largest Profit</td>
                            <td className={largestProfit > 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                            <td className={largestProfit > 0 ? 'total_gain_row' : 'total_loss_row'}>{largestProfit}</td>
                            <td className={largestProfit > 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > largestProfit ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > largestProfit ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > largestProfit ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > largestProfit ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>

                        </tr>
                        <tr className="background_grey_color">
                            <td>Largest Loss</td>
                            <td className={largestLoss > 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                            <td className={largestLoss > 0 ? 'total_gain_row' : 'total_loss_row'}>{largestLoss}</td>
                            <td className={lastFiftyTrades > 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > largestLoss ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > largestLoss ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > largestLoss ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > largestLoss ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        <tr>
                            <td>Largest Win %</td>
                            <td></td>
                            <td className={largestWinPercentage > 0 ? 'total_gain_row' : 'total_loss_row'}>{largestWinPercentage}</td>
                            <td></td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > largestWinPercentage ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > largestWinPercentage ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > largestWinPercentage ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > largestWinPercentage ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        <tr className="background_grey_color">
                            <td>Largest Loss %</td>
                            <td></td>
                            <td className={largestLossPercentage > 0 ? 'total_gain_row' : 'total_loss_row'}>{largestLossPercentage}</td>
                            <td></td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > largestLossPercentage ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > largestLossPercentage ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > largestLossPercentage ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > largestLossPercentage ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        <tr>
                            <td>Ave. Win %</td>
                            <td></td>
                            <td className={averageWinPercentage > 0 ? 'total_gain_row' : 'total_loss_row'}>{averageWinPercentage}</td>
                            <td></td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > averageWinPercentage ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > averageWinPercentage ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > averageWinPercentage ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > averageWinPercentage ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>

                        </tr>
                        <tr className="background_grey_color">
                            <td>Ave. Loss %</td>
                            <td></td>
                            <td className={averageLossPercentage > 0 ? 'total_gain_row' : 'total_loss_row'}>{averageLossPercentage}</td>
                            <td></td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > averageLossPercentage ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > averageLossPercentage ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > averageLossPercentage ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > averageLossPercentage ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        <tr>
                            <td>Reward To Risk Ratio</td>
                            <td></td>
                            <td className={rewardToRiskRatio > 0 ? 'total_gain_row' : 'total_loss_row'}>{rewardToRiskRatio}</td>
                            <td></td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > rewardToRiskRatio ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > rewardToRiskRatio ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > rewardToRiskRatio ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > rewardToRiskRatio ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        <tr className="background_grey_color">
                            <td>Profit Loss (Edge) Ratio</td>
                            <td></td>
                            <td className={profitLossRatio > 0 ? 'total_gain_row' : 'total_loss_row'}>{profitLossRatio}</td>
                            <td></td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > profitLossRatio ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > profitLossRatio ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > profitLossRatio ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > profitLossRatio ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        <tr>
                            <td>Profit factor</td>
                            <td></td>
                            <td className={profitFactor > 0 ? 'total_gain_row' : 'total_loss_row'}>{profitFactor}</td>
                            <td></td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > profitFactor ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > profitFactor ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > profitFactor ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > profitFactor ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        <tr className="background_grey_color">
                            <td>Expectancy Per Trade</td>
                            <td className={expectancyPerTrade > 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                            <td className={expectancyPerTrade > 0 ? 'total_gain_row' : 'total_loss_row'}>{expectancyPerTrade}</td>
                            <td className={expectancyPerTrade > 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                            <td>{lastFiftyTrades}</td>
                            <td>
                                <td className={lastFiftyTrades > expectancyPerTrade ? 'total_gain_row' : 'total_loss_row'}>{lastFiftyTrades > expectancyPerTrade ? "Improved" : "Declined"}<i
                                    className={lastFiftyTrades > expectancyPerTrade ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </td>
                            </td>
                            <td className={lastFiftyTrades > expectancyPerTrade ? 'total_gain_row' : 'total_loss_row'}>{changePercentage}</td>
                        </tr>
                        </tbody>
                    </table>
                </div>   </div>
            </div>
        </div>
    );
};
