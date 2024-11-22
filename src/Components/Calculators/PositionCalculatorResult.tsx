import React from "react";
import { PositionCalculatorModel } from "../Models/PositionCalculatorModel"; // Ensure this export exists

// Interface for the props
interface IPositionCalculatorResult {
    reset: () => void;
    formData: PositionCalculatorModel;
}

// Functional Component
export const PositionCalculatorResult: React.FC<IPositionCalculatorResult> = ({
                                                                                  reset,
                                                                                  formData,
                                                                              }) => {
    const claculateRiskPerShare =(entryPrice: number | null , stopPrice: number | null) => {
        if(entryPrice === null || stopPrice === null) {
            return null;
        }
        return (entryPrice - stopPrice)
    }
    const riskPerShare = claculateRiskPerShare(formData.entryPrice, formData.stopPrice)

    const calculateStopPercentValue = (riskPerShare:number|null, entryPrice:number | null) => {
        if(riskPerShare === null || entryPrice === null){
            return null;
        }
        return (riskPerShare % entryPrice);
    }
    const stopPercentValue = calculateStopPercentValue(riskPerShare,formData.entryPrice);

    const rows = [
        { name: "Trade Idea", dollarValue: null, percentValue: null, ticker: formData.ticker },
        { name: "Risk Tier (% Capital at Risk)", dollarValue: null, percentValue: formData.riskTier, ticker: null },
        { name: "Entry Price", dollarValue: formData.entryPrice, percentValue: null, ticker: null },
        { name: "Stop Price", dollarValue: formData.stopPrice, percentValue: stopPercentValue !== null ? stopPercentValue :null},
        { name: "Target Price", dollarValue: formData.targetPrice, percentValue: formData.riskTier, ticker: null },
        { name: "Risk Per Share", dollarValue: riskPerShare !== null ? riskPerShare.toFixed(2) : null,
            percentValue: null, ticker: null },
    ];

    return (
        <div className="bg-gray-100 flex flex-col space-y-8 items-center rounded-2xl shadow-lg p-8 mx-auto w-full max-w-4xl">
            <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
                    <thead className="bg-blue-500 text-white">
                    <tr>
                        <th className="px-4 py-2 text-left">Equity Calculator</th>
                        <th className="px-4 py-2 text-right">$</th>
                        <th className="px-4 py-2 text-right">Percentage</th>
                        <th className="px-4 py-2 text-right">Ticker</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rows.map((row, index) => (
                        <tr
                            key={row.name}
                            className={`${
                                index % 2 === 0 ? "bg-gray-50" : "bg-white"
                            } hover:bg-gray-100 transition-colors`}
                        >
                            <td className="px-4 py-2 border border-gray-200">{row.name}</td>
                            <td className="px-4 py-2 text-right border border-gray-200">
                                {row.dollarValue !== null ? `$${row.dollarValue}` : "-"}
                            </td>
                            <td className="px-4 py-2 text-right border border-gray-200">
                                {row.percentValue !== null ? `${row.percentValue}%` : "-"}
                            </td>
                            <td className="px-4 py-2 text-right border border-gray-200">
                                {row.ticker || "-"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>

            <button
                type="button"
                className="w-64 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={reset}
            >
                Reset
            </button>
        </div>
    );
};
