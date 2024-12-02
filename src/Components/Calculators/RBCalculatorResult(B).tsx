import React from "react";
import {RBCalculatorResultModel} from "@Components/Models/RBCalculatorResultModel.tsx";
import Swal from "sweetalert2";


interface IRBCalculatorResult {
    formData: RBCalculatorResultModel[];
    rB2Result: RBCalculatorResultModel[];
    rB3Result: RBCalculatorResultModel[];
}

export const RBCalculatorResultB: React.FC<IRBCalculatorResult> = ({formData, rB2Result, rB3Result}) => {
    const table1 = formData;

    return (
        <div className="position_result_table Hero-section row col-12">
            <div className="mt-2 mb-3">
                <table className="w-100">
                    <thead className="bg-blue-500 text-white">


                    </thead>
                    <tbody>

                    {table1.map((row, index) => (
                        row.name === "Desired Return" && row.percentValue !== null && row.percentValue !== undefined && (
                            <tr key={index}>
                                <td style={{color: "#2196f3"}}>
                                    {`To achieve a ${row.percentValue}% return on your portfolio, considering the fixed position size, average % gain, average % loss & % of winning trades,`}
                                    {rB3Result.map((row, index) => (
                                        row.name === "Number Of Trades Needed To Reach Gaol" && row.dollarValue !== null && row.dollarValue !== undefined && (
                                            <span key={index}>

                                                   You will need to execute <span
                                                style={{color: 'black', fontWeight: "bold"}}>{row.dollarValue}</span> trades.
                                            </span>
                                        )
                                    ))}
                                </td>
                            </tr>
                        )
                    ))}


                    </tbody>

                </table>
            </div>
            <div className=" col-6 ">


                <div className="">
                    <table className="w-100">
                        <thead className="text-center font_Epilogue line_height_32 heading-14 ">
                        <tr>

                            <th>Name</th>
                            <th>Value</th>

                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {table1.map((row,) => (
                            <tr
                                key={row.name}
                                className="bg-white"
                            >
                                <td className="px-4 py-2 text-right border border-gray-200">{row.name}</td>
                                {/*<td className="px-4 text-right py-2 border border-gray-200">*/}
                                {/*    {row.name === "Number Of Trades" ? row.dollarValue ?? "-" : row.dollarValue !== null && row.dollarValue !== undefined ? `$${row.dollarValue}` : "-"}*/}
                                {/*</td>*/}
                                <td className="px-4 py-2 text-right border border-gray-200">
                                    {row.name === "Portfolio Size"
                                        ? `$${row.percentValue}` : row.percentValue !== null && row.percentValue !== undefined
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
                        {rB2Result.map((row) => (
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
            <div className="col-6">
                <div className="">
                    <table className="w-100">
                        <thead className="text-center font_Epilogue line_height_32 heading-14 ">
                        <tr>
                            <th className="">Name</th>
                            <th className="">Value</th>
                        </tr>
                        </thead>
                        <tbody className="text-center">
                        {rB3Result.map((row) => (
                            <tr
                                key={row.name}
                                className="bg-white"
                            >
                                <td className="px-4 py-2 border border-gray-200">{row.name}</td>
                                <td className="px-4 text-right py-2 border border-gray-200">
                                    {row.name === "Number Of Trades Needed To Reach Gaol" && row.dollarValue !== undefined && row.dollarValue < 0 ?
                                        (Swal.fire({
                                            icon: "error",
                                            title: "Oops...",
                                            text: "Number Of Trades Needed To Reach Gaol cannot be negative",
                                        }), "-") :

                                        row.name === "Winning Trades" ||
                                        row.name === "Losing Trades" ||
                                        row.name === "Gain / Loss Ratio (Non Adjusted)" ||
                                        row.name === "Number Of Trades Needed To Reach Gaol" ||
                                        row.name === "Gain / Loss Ratio (Adjusted)"
                                            ? row.dollarValue ?? "-"
                                            : row.name === "Expected Net Return Per Trade" || row.name === "Optimal Position Size"
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