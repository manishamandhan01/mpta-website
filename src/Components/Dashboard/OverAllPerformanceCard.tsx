// @flow
import * as React from 'react';
import { useEffect } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";

type Props = {};

export const OverAllPerformanceCard = (props: Props) => {
    const {tradeRows, tradingSetting} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();
    const [totalProfit, setTotalProfit] = React.useState(0);
    const [totalLoss, setTotalLoss] = React.useState(0);
    const [totalGainPer, setTotalGainPer] = React.useState(0);
    const [totalLossPer, setTotalLossPer] = React.useState(0);
    const [totalProfitLoss, setTotalProfitLoss] = React.useState(0);
    const [totalProfitLossPer, setTotalProfitLossPer] = React.useState(0);
    const [profitLossData, setProfitLossData] = React.useState([]);

    useEffect(() => {
        fetchTradeResults().then((json) => {
                const overallPerformance = json['overall_performance'];

                setTotalProfit(overallPerformance['total_gain']);
                setTotalLoss(overallPerformance['total_loss']);
                setTotalGainPer(overallPerformance['total_gain_percent']);
                setTotalLossPer(overallPerformance['total_loss_percent']);
                setTotalProfitLoss(overallPerformance['overall_total_gain_loss']);
                setTotalProfitLossPer(overallPerformance['overall_total_gain_loss_percent']);

                // Prepare profit/loss data
                const topProfits = overallPerformance['top_3_profits'].map(item => ({
                    name: item[0],
                    value: item[1].pnl,
                    color: 'green'
                }));

                const topLosses = overallPerformance['top_3_losses'].map(item => ({
                    name: item[0],
                    value: -Math.abs(item[1].pnl), // Ensure losses are negative
                    color: 'red'
                }));

                // Combine profits & losses in the correct order
                setProfitLossData([...topProfits, ...topLosses]);
            })
            .catch((err) => console.log(err));
    }, []);

    // Extract names and values separately for Highcharts
    const profitLossNames = profitLossData.map(item => item.name);
    const profitLossValues = profitLossData.map(item => item.value);
    const barColors = profitLossData.map(item => item.color);

    // Highcharts options
    const chartOptions = {
        chart: {
            type: 'bar',
            height: 300,
        },
        title: {
            text: 'Top 3 Cumulative Profits and Losses',
            style: { fontSize: '15px', fontWeight: 'normal' }
        },
        xAxis: {
            categories: profitLossNames,
            gridLineWidth: 0,
        },
        yAxis: {
            title: { text: '' },
            min: Math.min(...profitLossValues) - 5000, // Adjust based on losses
            max: Math.max(...profitLossValues) + 5000, // Adjust based on profits
            reversed: false,
            labels: { enabled: false },

        },
        series: [{
            name: 'Profit/Loss',
            data: profitLossValues,
            colorByPoint: true,
            colors: barColors,
            dataLabels: {
                enabled: false,
                color: 'black',
                align: 'center',
                format: '{point.y}',
                style: { fontWeight: 'bold' }
            }
        }]
    };

    return (
        <div className="   ">
            <div className=" ">
                <div className="dashboard-overall-performance-card">
                    <div className="main_heading_card_inside"><h1
                        className="font_poppins heading-20 line_height_32 text-left font_weight_400 mt-2 ">Overall Performance</h1></div>
                    <div className="main_heading_card_inside">
                        <hr/>

                    </div>
                    <div className="amounts mt-4">
                        <div className="d-flex justify-content-between text-center mt-1">
                            <div className="lh-lg heading-16 font_poppins line_height_20 font_weight_400">
                                <p>Total Gain</p>
                                <p>Total Loss</p>
                                <p>Profit/Loss</p>
                            </div>
                            <div className="lh-lg heading-16 font_poppins line_height_20 font_weight_400">
                                <p className="total_gain_row">{tradingSetting.currencySymbol} {totalProfit}</p>
                                <p className="total_loss_row">{tradingSetting.currencySymbol} {totalLoss}</p>
                                <p className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>
                                    {tradingSetting.currencySymbol} {totalProfitLoss}
                                </p>
                            </div>
                            <div className="lh-lg heading-16 font_poppins line_height_20 font_weight_400">
                                <p className="total_gain_row"><i className="fa-solid fa-caret-up"></i></p>
                                <p className="total_loss_row"><i className="fa-solid fa-caret-down"></i></p>
                                <p className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>
                                    <i className={totalProfitLoss >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>
                                </p>
                            </div>
                            <div className="lh-lg heading-16 font_poppins line_height_20 font_weight_400">
                                <p className="total_gain_row">{totalGainPer}%</p>
                                <p className="total_loss_row">{totalLossPer}%</p>
                                <p className={totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row'}>
                                    {totalProfitLossPer}%
                                </p>
                            </div>
                        </div>
                        <div
                            className="profit-loss-bar mt-1"
                            style={{
                                background: `linear-gradient(to right, green ${totalGainPer}%, red ${totalLossPer}%)`,
                                width: '100%',
                                height: '20px',
                                borderRadius: '1px',
                                marginTop: '3px',
                            }}
                        ></div>
                    </div>
                    <div id="overAllPerformanceChart" className="mt-1">
                        <HighchartsReact highcharts={Highcharts} options={chartOptions}/>
                    </div>
                </div>
            </div>
        </div>
    );
};

