import React from "react";
import {RBCalculatorResultModel} from "@Components/Models/RBCalculatorResultModel.tsx";


interface IRBCalculatorResult {
    formData: RBCalculatorResultModel[];
    rB2Result: RBCalculatorResultModel[];
    rB3Result: RBCalculatorResultModel[];
}

export const RBCalculatorResultB: React.FC<IRBCalculatorResult> = ({formData, rB2Result, rB3Result}) => {
    const table1 = formData;

    return (
        <div  className="position_result_table Hero-section row col-12">
            <div className=" col-6 " >



            <div className="">
                <table className="w-100">
                    <thead className="text-center font_Epilogue line_height_32 heading-14 ">
                    <tr>
                        <th >Name</th>
                        <th>Value</th>

                    </tr>
                    </thead>
                    <tbody className="text-center">
                    {table1.map((row, ) => (
                        <tr
                            key={row.name}
                            className="bg-white"
                        >
                            <td className="px-4 py-2 text-right border border-gray-200">{row.name}</td>
                            {/*<td className="px-4 text-right py-2 border border-gray-200">*/}
                            {/*    {row.name === "Number Of Trades" ? row.dollarValue ?? "-" : row.dollarValue !== null && row.dollarValue !== undefined ? `$${row.dollarValue}` : "-"}*/}
                            {/*</td>*/}
                            <td className="px-4 py-2 text-right border border-gray-200">
                                { row.name === "Portfolio Size"
                                    ? `$${row.percentValue}`: row.percentValue !== null && row.percentValue !== undefined
                                    ? `${row.percentValue}%`

                                        : "-"
                                }
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
                    {rB2Result.map((row, index) => (
                        <tr
                            key={row.name}
                            className="bg-white"
                        >
                            <td className="px-4 py-2 border border-gray-200">{row.name}</td>
                            <td className="px-4 py-2 text-right border border-gray-200">
                                {row.dollarValue !== null && row.dollarValue !== undefined ? `${row.dollarValue}` : "-"}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>
            <div className="col-6" >
                <div className="">
                    <table className="w-100">
                        <thead className="text-center font_Epilogue line_height_32 heading-14 ">
                        <tr>
                            <th className="">Name</th>
                            <th className="">Value</th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {rB3Result.map((row, index) => (
                            <tr
                                key={row.name}
                                className="bg-white"
                            >
                                <td className="px-4 py-2 border border-gray-200">{row.name}</td>
                                <td className="px-4 text-right py-2 border border-gray-200">
                                    {row.name === "Winning Trades" ||
                                    row.name === "Losing Trades" ||
                                    row.name === "Gain / Loss Ratio (Non Adjusted)" ||
                                    row.name === "Number Of Trades Needed To Reach Gaol" ||
                                    row.name === "Gain / Loss Ratio (Adjusted)"
                                        ? row.dollarValue ?? "-"
                                        : row.name === "Expected Net Return Per Trade" || row.name ==="Optimal Position Size"
                                            ? `${row.dollarValue}%`
                                            : row.dollarValue !== null && row.dollarValue !== undefined
                                                ? `$${row.dollarValue}`
                                                : "-"}

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