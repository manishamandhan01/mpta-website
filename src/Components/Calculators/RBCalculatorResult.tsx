import React from "react";
import {RBCalculatorModel} from "../Models/RBCalculatorModel.tsx";


interface IRBCalculatorResult {
    formData:RBCalculatorModel;
}
export const RBCalculatorResult :React.FC<IRBCalculatorResult>  = ({formData})=>{
    console.log(formData);
    // const rows = [
    //     {
    //         "name": "test",
    //         "dollarValue": 0,
    //         "percentValue": 0,
    //         "ticker": "msft",
    //     }
    // ];
    // const rows2 = [
    //     {
    //         "name": "test",
    //         "dollarValue": 0,
    //         "percentValue": 0,
    //         "ticker": "msft",
    //     }
    // ];
    return (
        <div
            className="bg-gray-100 flex flex-col space-y-8 items-center rounded-2xl shadow-lg p-8 mx-auto w-full max-w-4xl">
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
                            <td className="px-4 py-2 text-right border border-gray-200">
                                {row.name}
                            </td>
                            <td className="px-4 text-right py-2 border border-gray-200">{row.name === "Number Of Shares" ? row.dollarValue ?? "-" : row.dollarValue !== null ? `$${row.dollarValue}` : "-"}</td>

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
            <div className="w-full overflow-x-auto">
                <table className="min-w-full table-auto border-collapse border border-gray-200 rounded-lg">
                    <thead className="bg-blue-500 text-white">

                    </thead>
                    <tbody>
                    {rows2.map((row, index) => (
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
    )
}