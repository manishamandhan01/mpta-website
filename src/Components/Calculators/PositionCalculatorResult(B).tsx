import React from "react";
import {PositionCalculatorResultModel} from "@Components/Models/PositionCalculatorResultModel.tsx";

interface IPositionCalculatorResult {
    formData: PositionCalculatorResultModel[];
    rtrResult: number;
}

export const PositionCalculatorResultB: React.FC<IPositionCalculatorResult> = ({

                                                                                  formData, rtrResult
                                                                              }) => {
    const resultData = formData;
    const rtrData = rtrResult;
    console.log(resultData);


    return (
        <div
            className="position_result_table">
            <div className="">
                <table className="w-100">
                    <thead className="text-center font_Epilogue line_height_32 heading-14 ">
                    <tr>
                        <th className="">Equity Calculator</th>
                        <th className="">$</th>
                        <th className="">Percentage</th>
                        <th className="">Ticker</th>
                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {resultData.map((row, index) => (
                        <tr
                            key={row.name}
                            className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                        >
                            <td className="px-4 py-2 text-right border border-gray-200">
                                {row.name}
                            </td>
                            <td className="px-4 text-right py-2 border border-gray-200">{row.name === "Number Of Shares" ? row.dollarValue ?? "-" : row.dollarValue !== null && row.dollarValue !== undefined ? `$${row.dollarValue}` : "-"}</td>

                            <td className="px-4 py-2 text-right border border-gray-200">
                                {row.percentValue !== null && row.percentValue !== undefined ? `${row.percentValue}%` : "-"}
                            </td>
                            <td className="px-4 py-2 text-right border border-gray-200">
                                {row.ticker || "-"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <div className="mt-2">
                <table className="w-100">
                    <thead className="bg-blue-500 text-white">

                    </thead>
                    <tbody>

                        <tr
                            key="Risk To Reward Ratio"
                            // className={`${index % 2 === 0 ? "bg-gray-50" : "bg-white"} hover:bg-gray-100 transition-colors`}
                        >
                            <td className="px-4 py-2 border border-gray-200">Risk To Reward Ratio</td>
                            <td className="px-4 py-2 text-right border border-gray-200">
                                {rtrData !== null ? `1: ${rtrData }` : "-"}
                            </td>


                        </tr>
                    </tbody>
                </table>
            </div>


        </div>
    );
};