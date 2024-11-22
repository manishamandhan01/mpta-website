import React from "react";
import { PositionCalculatorModel } from "../Models/PositionCalculatorModel";

interface IPositionCalculatorResult {
    reset: () => void;
    formData: PositionCalculatorModel;
}

export const PositionCalculatorResult: React.FC<IPositionCalculatorResult> = ({
                                                                                  reset,
                                                                                  formData,
                                                                              }) => {
    const calculateRiskPerShare = (
        entryPrice: number | null,
        stopPrice: number | null
    ): number | null => {
        if (entryPrice === null || stopPrice === null) return null;
        return entryPrice - stopPrice;
    };

    const calculateStopPercentValue = (
        riskPerShare: number | null,
        entryPrice: number | null
    ): number | null => {
        if (riskPerShare === null || entryPrice === null) return null;
        return (riskPerShare / entryPrice) * 100; // Converted to percentage
    };

    const calculateDollarRiskValue = (
        riskTier: number | null,
        accountBalance: number | null
    ): number | null => {
        if (riskTier === null || accountBalance === null) return null;
        return (riskTier / 100) * accountBalance;
    };

    const calculateNumberOfShares = (
        dollarRisk: number | null,
        riskPerShare: number | null
    ): number | null => {
        if (dollarRisk === null || riskPerShare === null) return null;
        return dollarRisk / riskPerShare;
    };

    const calculateCapitalAllocationDollarValue = (
        numberOfShares: number | null,
        entryPrice: number | null
    ): number | null => {
        if (numberOfShares === null || entryPrice === null) return null;
        return numberOfShares * entryPrice;
    };

    const calculateCapitalAllocationPercentValue = (
        capitalAllocation: number | null,
        accountBalance: number | null
    ): number | null => {
        if (capitalAllocation === null || accountBalance === null) return null;
        return (capitalAllocation / accountBalance) * 100; // Converted to percentage
    };
    const calculatePotentialUpsideDollarValue = (
        targetPrice: number | null,
        entryPrice: number | null,
        numberOfShares: number | null
    ): number | null => {
        if(targetPrice === null || entryPrice === null || numberOfShares === null) return null;
        return (targetPrice-entryPrice)* numberOfShares;
    };
    const calculatePotentialUpsidePercentValue = (
        accountBalance: number | null,
        potentialUpsideDollarValue: number | null
    ): number | null => {
        if (accountBalance === null || potentialUpsideDollarValue === null) return null;
        return (potentialUpsideDollarValue / accountBalance) * 100; // Convert to percentage
    };



    // Calculations
    const riskPerShare = calculateRiskPerShare(
        formData.entryPrice,
        formData.stopPrice
    );
    const stopPercentValue = calculateStopPercentValue(
        riskPerShare,
        formData.entryPrice
    );
    const dollarRiskDollarValue = calculateDollarRiskValue(
        formData.riskTier,
        formData.accountBalance
    );
    const numberOfShares = calculateNumberOfShares(
        dollarRiskDollarValue,
        riskPerShare
    );
    const capitalAllocationDollarValue = calculateCapitalAllocationDollarValue(
        numberOfShares !== null ? Math.floor(numberOfShares) : null,
        formData.entryPrice
    );
    const capitalAllocationPercentValue = calculateCapitalAllocationPercentValue(
        capitalAllocationDollarValue,
        formData.accountBalance
    );
    const potentialUpsideDollarValue = calculatePotentialUpsideDollarValue(
        formData.targetPrice,
        formData.entryPrice,
        numberOfShares !== null ? Math.floor(numberOfShares) : null,
    );
    const potentialUpsidePercentValue = calculatePotentialUpsidePercentValue(
        formData.accountBalance,
        potentialUpsideDollarValue
    );

    const rows = [
        { name: "Trade Idea", dollarValue: null, percentValue: null, ticker: formData.ticker },
        { name: "Risk Tier (% Capital at Risk)", dollarValue: null, percentValue: formData.riskTier, ticker: null },
        { name: "Entry Price", dollarValue: formData.entryPrice, percentValue: null, ticker: null },
        { name: "Stop Price", dollarValue: formData.stopPrice, percentValue: stopPercentValue !== null ? stopPercentValue.toFixed(2) : null },
        { name: "Target Price", dollarValue: formData.targetPrice, percentValue: formData.targetPrice && formData.entryPrice ? (((formData.targetPrice / formData.entryPrice) - 1) * 100).toFixed(2) : null, ticker: null },
        { name: "Dollar Risk", dollarValue: dollarRiskDollarValue !== null ? dollarRiskDollarValue.toFixed(2) : null, percentValue: null, ticker: null },
        { name: "Risk Per Share", dollarValue: riskPerShare !== null ? riskPerShare.toFixed(2) : null, percentValue: null, ticker: null },
        { name: "Number Of Shares", dollarValue: numberOfShares !== null ? Math.floor(numberOfShares) : null, percentValue: null, ticker: null },
        { name: "Capital Allocation", dollarValue: capitalAllocationDollarValue !== null ? capitalAllocationDollarValue.toFixed(2) : null, percentValue: capitalAllocationPercentValue !== null ? capitalAllocationPercentValue.toFixed(2) : null, ticker: null },
        { name: "Potential Upside", dollarValue: potentialUpsideDollarValue !== null ? potentialUpsideDollarValue.toFixed(2) : null, percentValue: potentialUpsidePercentValue !== null ? potentialUpsidePercentValue.toFixed(2) : null, ticker: null },
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
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
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
