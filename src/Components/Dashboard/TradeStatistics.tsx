import * as React from 'react';
import { useEffect } from "react";
import { useTradeResults, useGlobalStore } from "@Components/DataGrid/GlobalState.tsx";

type Props = {};

// Utility to determine remarks and class
const getChangeStatus = (recent: number, allTime: number) => {
    const improved = recent > allTime;
    return {
        text: improved ? 'Improved' : 'Declined',
        icon: improved ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down',
        className: improved ? 'total_gain_row' : 'total_loss_row'
    };
};

export const TradeStatistics = (props: Props) => {
    const { tradingSetting } = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();

    const [stats, setStats] = React.useState({
        winRatePercentage: 0,
        largestProfit: 0,
        largestLoss: 0,
        largestWinPercentage: 0,
        largestLossPercentage: 0,
        averageWinPercentage: 0,
        averageLossPercentage: 0,
        rewardToRiskRatio: 0,
        profitLossRatio: 0,
        profitFactor: 0,
        expectancyPerTrade: 0,
    });
    // For demonstration, using same value for last 50 trades for all metrics
    const [lastFiftyStats, setLastFiftyStats] = React.useState({
        winRatePercentage: 50.45,
        largestProfit: 50.45,
        largestLoss: 50.45,
        largestWinPercentage: 50.45,
        largestLossPercentage: 50.45,
        averageWinPercentage: 50.45,
        averageLossPercentage: 50.45,
        rewardToRiskRatio: 50.45,
        profitLossRatio: 50.45,
        profitFactor: 50.45,
        expectancyPerTrade: 50.45,
    });
    const [changePercentage, setChangePercentage] = React.useState("17%");

    useEffect(() => {
        fetchTradeResults()
            .then((json) => {
                const s = json['trade_statistics'];
                setStats({
                    winRatePercentage: s.win_rate_percentage,
                    largestProfit: s.largest_profit,
                    largestLoss: s.largest_loss,
                    largestWinPercentage: s.largest_win_percentage,
                    largestLossPercentage: s.largest_loss_percentage,
                    averageWinPercentage: s.average_win_percentage,
                    averageLossPercentage: s.average_loss_percentage,
                    rewardToRiskRatio: s.reward_to_risk_ratio,
                    profitLossRatio: s.profit_loss_ratio,
                    profitFactor: s.profit_factor,
                    expectancyPerTrade: s.expectancy_per_trade,
                });
                // TODO: Replace with actual last 50 trades stats if available
                // setLastFiftyStats({...});
            })
            .catch((err) => console.log(err));
    }, []);

    // Row rendering function
    const renderStatRow = (
        label: string,
        key: keyof typeof stats,
        isCurrency: boolean = false,
        rowClassName: string = ''
    ) => {
        const value = stats[key];
        const recent = lastFiftyStats[key];
        const status = getChangeStatus(recent, value);
        return (
            <tr className={rowClassName}>
                <td>{label}</td>
                <td className={value > 0 ? 'total_gain_row' : 'total_loss_row'}>
                    {isCurrency ? tradingSetting.currencySymbol : ''}
                </td>
                <td className={value > 0 ? 'total_gain_row' : 'total_loss_row'}>{value}</td>
                {/*<td className={recent > 0 && isCurrency ? (recent > 0 ? 'total_gain_row' : 'total_loss_row') : ''}>
                    {isCurrency ? tradingSetting.currencySymbol : ''}
                </td>
                <td className={recent > 0 ? 'total_gain_row' : 'total_loss_row'}>{recent}</td>
                <td className={status.className}>
                    {status.text}
                    <i className={status.icon}></i>
                </td>
                <td className={status.className}>{changePercentage}</td>*/}
            </tr>
        );
    };

    // Metrics config array for mapping
    const metrics = [
        { label: "Win rate %:", key: "winRatePercentage", isCurrency: false },
        { label: "Largest Profit", key: "largestProfit", isCurrency: true },
        { label: "Largest Loss", key: "largestLoss", isCurrency: true },
        { label: "Largest Win %", key: "largestWinPercentage", isCurrency: false },
        { label: "Largest Loss %", key: "largestLossPercentage", isCurrency: false },
        { label: "Ave. Win %", key: "averageWinPercentage", isCurrency: false },
        { label: "Ave. Loss %", key: "averageLossPercentage", isCurrency: false },
        { label: "Reward To Risk Ratio", key: "rewardToRiskRatio", isCurrency: false },
        { label: "Profit Loss (Edge) Ratio", key: "profitLossRatio", isCurrency: false },
        { label: "Profit factor", key: "profitFactor", isCurrency: false },
        { label: "Expectancy Per Trade", key: "expectancyPerTrade", isCurrency: true },
    ];

    return (
        <div>
            <div className="main_heading_card_inside">
                <h1 className="font_poppins heading-20 text-left line_height_32 font_weight_400 mt-1">
                    Trade Statistics
                </h1>
                <hr />
            </div>
            <table className="table mt-4" style={{ borderCollapse: 'collapse' }}>
                <thead>
                    <tr>
                        <th className="font_Epilogue" style={{ fontSize: '15px' }}>Metrics</th>
                        <th className="font_Epilogue" style={{ fontSize: '15px' }}></th>
                        <th className="font_Epilogue" style={{ fontSize: '15px' }}>All Trades Stats</th>
                        {/*<th className="font_Epilogue" style={{ fontSize: '15px' }}></th>
                        <th className="font_Epilogue" style={{ fontSize: '15px' }}>Last 50 Trades</th>
                        <th className="font_Epilogue" style={{ fontSize: '15px' }}>Remarks</th>
                        <th className="font_Epilogue" style={{ fontSize: '15px' }}>Change %</th>*/}
                    </tr>
                </thead>
                <tbody>
                    {metrics.map((m, idx) =>
                        renderStatRow(
                            m.label,
                            m.key as keyof typeof stats,
                            m.isCurrency,
                            idx % 2 === 0 ? 'background_grey_color' : ''
                        )
                    )}
                </tbody>
            </table>
        </div>
    );
};
