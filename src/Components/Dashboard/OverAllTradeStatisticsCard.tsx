// @flow
import * as React from 'react';
import {PositionCalculatorModel} from "@Components/Models/PositionCalculatorModel.tsx";
import {CPSModel} from "@Components/Utils/Constants.tsx";
import {OverAllPerformanceModel} from "@Components/Models/OverAllPerformanceModel.tsx";
import {useEffect} from "react";

type Props = {};

export const OverAllTradeStatisticsCard = (props: Props) => {
    const [cardData, setCardData] = React.useState<OverAllPerformanceModel | null>(null); // Allowing null for initial state
    const [totalProfit, setTotalProfit] = React.useState(0);
    const [totalLoss, setTotalLoss] = React.useState(0);
    const [totalGainPer, setTotalGainPer] = React.useState(0);
    const [totalLossPer, setTotalLossPer] = React.useState(0);
    const [totalProfitLoss, setTotalProfitLoss] = React.useState(0);
    const [totalProfitLossPer, setTotalProfitLossPer] = React.useState(0);

    // Define the function to fetch the overall performance data
    const overAllPerformanceData = () => {
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
                setTotalProfit(json["total_profit"]);
                setTotalLoss(json["total_loss"]);
                setTotalGainPer(json["total_profit_percentage"]);
                setTotalLossPer(json["total_loss_percentage"]);
                setTotalProfitLoss(json["total_profit_loss"]);
                setTotalProfitLossPer(json["total_profit_loss_percentage"]);
            })
            .catch(err => console.log(err));
    };

    // Use the effect to call the function on mount or when cardData changes
    useEffect(() => {
        overAllPerformanceData();
    }, [cardData]); // Dependency array makes sure the effect runs when cardData changes

    return (
        <div>
            <div className="card-container">
                <div className="dashboard-overall-trade-statistics-card" >
                    <h1 style={{
                        fontSize: "30px",
                        fontWeight: "normal"
                    }}>Overall Performance</h1>
                    <div className="amounts">
                        <div className="amounts-row">
                            <p>Total Gain</p>
                            <p className="total_gain_row">$</p>
                            <p className="total_gain_row">{totalProfit}</p>
                            <span className="total_gain_row"><i className="fa-solid fa-caret-up"></i></span>
                            <p className="total_gain_row">{totalGainPer}%</p>
                        </div>
                        <div className="amounts-row">
                            <p>Total Loss</p>
                            <p className="total_loss_row">$</p>

                            <p className="total_loss_row">{totalLoss}</p>
                            <span className="total_loss_row"><i className="fa-solid fa-caret-down"></i></span>
                            <p className="total_loss_row">{totalLossPer}%</p>
                        </div>
                        <div className="amounts-row">
                            <p>Profit/Loss</p>
                            <p className={totalProfitLoss >= 0 ? "total_gain_row" : "total_loss_row"}>$</p>
                            <p className={totalProfitLoss >= 0 ? "total_gain_row" : "total_loss_row"}>{totalProfitLoss}</p>
                            <span className={totalProfitLoss >= 0 ? "total_gain_row" : "total_loss_row"}>
            <i className={totalProfitLoss >= 0 ? "fa-solid fa-caret-up" : "fa-solid fa-caret-down"}></i>
        </span>
                            <p className={totalProfitLoss >= 0 ? "total_gain_row" : "total_loss_row"}>
                                {totalProfitLossPer}%
                            </p>
                        </div>
                        <div className="profit-loss-bar" style={{
                            background: `linear-gradient(to right, green ${totalGainPer}%, red ${totalLossPer}%)`,
                            width: '100%',
                            height: '20px',
                            borderRadius: '1px',
                            marginTop: '20px'
                        }}></div>
                    </div>
                </div>
            </div>

        </div>
    );
};
