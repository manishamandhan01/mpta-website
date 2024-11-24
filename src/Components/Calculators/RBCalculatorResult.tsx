import React from "react";
import {RBCalculatorResultModel} from "@Components/Models/RBCalculatorResultModel.tsx";


interface IRBCalculatorResult {
    formData: RBCalculatorResultModel[];
    rB2Result: RBCalculatorResultModel[];
    rB3Result: RBCalculatorResultModel[];
}

export const RBCalculatorResult: React.FC<IRBCalculatorResult> = ({formData, rB2Result, rB3Result}) => {
    const table1 = formData;

    return (
        <div className="flex flex-row space-x-4 items-center rounded-2xl p-8 mx-auto w-full max-w-4xl">
            <div className="flex flex-col space-y-8 items-center rounded-2xl shadow-lg p-8 mx-auto w-full max-w-4xl">
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-2xl">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-right">$</th>
                            <th className="px-4 py-2 text-right">Percentage</th>
                        </tr>
                        </thead>
                        <tbody>
                        {table1.map((row, index) => (
                            <tr
                                key={row.name}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                            >
                                <td className="px-4 py-2 text-right border border-gray-200">{row.name}</td>
                                <td className="px-4 text-right py-2 border border-gray-200">
                                    {row.name === "Number Of Trades" ? row.dollarValue ?? "-" : row.dollarValue !== null ? `$${row.dollarValue}` : "-"}
                                </td>
                                <td className="px-4 py-2 text-right border border-gray-200">
                                    {row.percentValue !== null ? `${row.percentValue}%` : "-"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
                        <thead className="bg-blue-500 text-white"></thead>
                        <tbody>
                        {rB2Result.map((row, index) => (
                            <tr
                                key={row.name}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                            >
                                <td className="px-4 py-2 border border-gray-200">{row.name}</td>
                                <td className="px-4 py-2 text-right border border-gray-200">
                                    {row.dollarValue !== null ? `${row.dollarValue}` : "-"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="flex flex-col space-y-8 items-center rounded-2xl shadow-lg p-8 mx-auto w-full max-w-4xl max-h-xl">
                <div className="w-full overflow-x-auto">
                    <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
                        <thead className="bg-blue-500 text-white">
                        <tr>
                            <th className="px-4 py-2 text-left">Name</th>
                            <th className="px-4 py-2 text-right">$</th>
                        </tr>
                        </thead>
                        <tbody>
                        {rB3Result.map((row, index) => (
                            <tr
                                key={row.name}
                                className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                            >
                                <td className="px-4 py-2 border border-gray-200">{row.name}</td>
                                <td className="px-4 text-right py-2 border border-gray-200">
                                    {row.name === "Winning Trades" ? row.dollarValue ?? "-" : row.dollarValue !== null ? `$${row.dollarValue}` : "-"}
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
            </div>

            )
            }