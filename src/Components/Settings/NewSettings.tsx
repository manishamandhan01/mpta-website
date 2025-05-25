import React, { useState } from "react";
import Button from "@mui/material/Button";
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";

export default function SettingsPanel() {
    const {tradingSetting, setTradingSetting} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();


    const handleSetupChange = (index, key, value) => {
        const updated = [...tradingSetting.setupSettings];
        updated[index][key] = value;
        setTradingSetting({ ...tradingSetting, setupSettings: updated });
    };

    const handleNoteChange = (index, value) => {
        const updated = [...tradingSetting.noteDefaults];
        updated[index].reason = value;
        setTradingSetting({ ...tradingSetting, noteDefaults: updated });
    };

    const handleEvaluationChange = (index, key, value) => {
        const updated = [...tradingSetting.evaluationSettings];
        updated[index][key] = key.includes("score") ? parseInt(value) : value;
        setTradingSetting({ ...tradingSetting, evaluationSettings: updated });
    };

    const addSetupRow = () => {
        setTradingSetting({
            ...tradingSetting,
            setupSettings: [...tradingSetting.setupSettings, { setup: "", definition: "" }]
        });
    };

    const addNoteRow = () => {
        setTradingSetting({
            ...tradingSetting,
            noteDefaults: [...tradingSetting.noteDefaults, { reason: "" }]
        });
    };

    const addEvaluationRow = () => {
        setTradingSetting({
            ...tradingSetting,
            evaluationSettings: [...tradingSetting.evaluationSettings, { entryExit: "", score1: 0, emotion: "", score2: 0 }]
        });
    };

    const handleSubmit = () => {
        console.log("Data submitted:", tradingSetting);
        fetchTradeResults();
    };

    return (
        <div className="p-6 grid grid-cols-1 gap-4 text-sm">

            <div className="">
                <div className="row col-12 gap-4px  main-trade-log-cards m-auto mt-5  ">
                    {/* Distribution Chart Settings */}
                    <div className=" col-xl-4 col-lg-6 col-md-6 col-sm-12 card  position-relative ">
                        <div className="text-lg font-bold mb-2">Distribution Chart Settings</div>
                        <div className="grid gap-2">
                            <label>Interval %</label>
                            <input className="border p-1" value={tradingSetting.interval}
                                   onChange={e => setTradingSetting({...tradingSetting, interval: e.target.value})}/>
                            <label>Y Axis Gap</label>
                            <input className="border p-1" value={tradingSetting.yAxisGap}
                                   onChange={e => setTradingSetting({...tradingSetting, yAxisGap: e.target.value})}/>
                            <label>No. of Trades</label>
                            <input className="border p-1" type="number" value={tradingSetting.noOfTrades}
                                   onChange={e => setTradingSetting({...tradingSetting, noOfTrades: parseInt(e.target.value)})}/>
                        </div>
                    </div>

                    {/* Currency Settings */}
                    <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 card   position-relative ">
                        <div className="text-lg font-bold mb-2">Currency Settings</div>
                        <label>Currency Symbol</label>
                        <input className="border p-1" value={tradingSetting.currencySymbol}
                               onChange={e => setTradingSetting({...tradingSetting, currencySymbol: e.target.value})}/>
                        <div className="mt-2">Preview: {tradingSetting.currencySymbol}</div>
                    </div>

                    {/* Log Settings */}
                    <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 card  position-relative ">
                        <div className="text-lg font-bold mb-2">Log Settings</div>
                        <label>Retain Formula</label>
                        <input className="border p-1" type="number" value={tradingSetting.retainFormula}
                               onChange={e => setTradingSetting({...tradingSetting, retainFormula: parseInt(e.target.value)})}/>
                        <label>Rows to Add</label>
                        <input className="border p-1" type="number" value={tradingSetting.rowsToAdd}
                               onChange={e => setTradingSetting({...tradingSetting, rowsToAdd: parseInt(e.target.value)})}/>
                    </div>

                    {/* Stats Settings */}
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 card  position-relative ">
                        <div className="text-lg font-bold mb-2">Stats Settings</div>
                        <label>W/L Count</label>
                        <input className="border p-1" value="Per Tranche" disabled/>
                        <label>Last No. of Trades</label>
                        <input className="border p-1" type="number" value={tradingSetting.winLossCount}
                               onChange={e => setTradingSetting({...tradingSetting, winLossCount: parseInt(e.target.value)})}/>
                    </div>
                </div>
                <div className="row col-12 gap-10px  main-trade-log-cards m-auto mt-4  ">

                    {/* Report Date Settings */}
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 card  position-relative ">
                        <div className="text-lg font-bold mb-2">Report Date Settings</div>
                        <label>Report Date</label>
                        <input className="border p-1" value={tradingSetting.reportDate}
                               onChange={e => setTradingSetting({...tradingSetting, reportDate: e.target.value})}/>


                    </div>
                    <div
                        className="col-xl-7 col-lg-6 col-md-6 col-sm-12 card  position-relative p-4 rounded-2xl  ">


                        <div className="overflow-x-auto">
                            <table className="table-auto w-full border-collapse border text-sm">
                                <thead>
                                <tr className="bg-gray-100 text-left">
                                    <th className="border px-3 py-2">Fees</th>
                                    <th className="border px-3 py-2">From</th>
                                    <th className="border px-3 py-2">Multiply By</th>
                                    <th className="border px-3 py-2">Minimum</th>
                                    <th className="border px-3 py-2">From</th>
                                    <th className="border px-3 py-2">Maximum</th>
                                </tr>
                                </thead>
                                <tbody>
                                {[
                                    {fees: "Commission", multiplyBy: "0.00000"},
                                    {fees: "VAT", multiplyBy: "0.00"},
                                    {fees: "Tax", multiplyBy: "0.00"},
                                    {fees: "Sales Tax", multiplyBy: "0.00000", },
                                ].map((row, index) => (
                                    <tr key={index} className="even:bg-white odd:bg-gray-50">
                                        <td className="border px-4 py-1 font-medium">
                                            <span >{row.fees}</span>
                                        </td>
                                        <td className="border px-4 py-1">Amount</td>
                                        <td className="border px-4 py-1">
                                            <input
                                                type="number"
                                                className="w-full mt-2 border rounded"
                                                value={row.multiplyBy}
                                                placeholder="Enter value in decimals"
                                                readOnly
                                            />
                                        </td>
                                        <td className="border px-4 py-1">0.0</td>
                                        <td className="border px-4 py-1">Amount</td>
                                        <td className="border px-4 py-1"></td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>

                    </div>

                </div>


            </div>


            <div className="row col-12  main-trade-log-cards m-auto gap-4px mt-4 tex ">
                {/* Setup Settings */}
                <div
                    className="col-xl-4 col-lg-6 col-md-6 col-sm-12 card  position-relative p-4 rounded-2xl ">
                    <div className="text-lg font-bold mb-3 flex justify-between items-center">
                        Setup Settings
                        <button
                            onClick={addSetupRow}
                            className="btn text-white bg-primary-300 font_weight_500 px-3"
                        >
                            + Add
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border text-sm">
                            <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="border px-3 py-2">Setup</th>
                                <th className="border px-3 py-2">Definition and Rules</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tradingSetting.setupSettings.map((row, index) => (
                                <tr key={index} className="even:bg-white odd:bg-gray-50">
                                    <td className="border px-2 py-1">
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={row.setup}
                                            onChange={e => handleSetupChange(index, "setup", e.target.value)}
                                    placeholder="Setup"
                                />
                            </td>
                            <td className="border px-2 py-1">
                                <input
                                    className="w-full p-1 border rounded"
                                    value={row.definition}
                                    onChange={e => handleSetupChange(index, "definition", e.target.value)}
                                    placeholder="Definition and Rules"
                                />
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>


        {/* Note Default Settings */}
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 card  position-relative ">
            <div className="text-lg font-bold mb-2 flex justify-between items-center mt-3 ">
                Note Default Settings
                <button onClick={addNoteRow} className={"btn  text-white bg-primary-300 font_weight_500 px-3"}>+
                    Add</button>
            </div>
            <div className="grid gap-2 font-semibold">
                <div>Reason for Buying/Selling</div>
            </div>
            <div className="grid gap-2 mt-1">
                {tradingSetting.noteDefaults.map((item, index) => (
                    <input key={index} className="border p-1" value={item.reason}
                           onChange={e => handleNoteChange(index, e.target.value)}
                           placeholder="Reason for Buying/Selling"/>
                ))}
            </div>
        </div>

        {/* Evaluation Settings */}
        <div
            className="col-xl-4 col-lg-6 col-md-6 col-sm-12 card  position-relative p-4 rounded-2xl  ">
            <div className="text-lg font-bold mb-3 flex justify-between items-center">
                Evaluation Settings
                <button
                    onClick={addEvaluationRow}
                    className="btn text-white bg-primary-300 font_weight_500 px-3"
                        >
                            + Add
                        </button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="table-auto w-full border-collapse border text-sm">
                            <thead>
                            <tr className="bg-gray-100 text-left">
                                <th className="border px-3 py-2">Entry/Exit</th>
                                <th className="border px-3 py-2">Score</th>
                                <th className="border px-3 py-2">Emotion</th>
                                <th className="border px-3 py-2">Score</th>
                            </tr>
                            </thead>
                            <tbody>
                            {tradingSetting.evaluationSettings.map((row, index) => (
                                <tr key={index} className="even:bg-white odd:bg-gray-50">
                                    <td className="border px-2 py-1">
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={row.entryExit}
                                            onChange={e =>
                                                handleEvaluationChange(index, "entryExit", e.target.value)
                                            }
                                            placeholder="Entry/Exit"
                                        />
                                    </td>
                                    <td className="border px-2 py-1">
                                        <input
                                            type="number"
                                            className="w-full p-1 border rounded"
                                            value={row.score1}
                                            onChange={e =>
                                                handleEvaluationChange(index, "score1", e.target.value)
                                            }
                                            placeholder="Score"
                                        />
                                    </td>
                                    <td className="border px-2 py-1">
                                        <input
                                            className="w-full p-1 border rounded"
                                            value={row.emotion}
                                            onChange={e =>
                                                handleEvaluationChange(index, "emotion", e.target.value)
                                            }
                                            placeholder="Emotion"
                                        />
                                    </td>
                                    <td className="border px-2 py-1">
                                        <input
                                            type="number"
                                            className="w-full p-1 border rounded"
                                            value={row.score2}
                                            onChange={e =>
                                                handleEvaluationChange(index, "score2", e.target.value)
                                            }
                                            placeholder="Score"
                                        />
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>

            {/* Submit Button */}
            <div className="col-span-3 text-center mt-4 mb-5">
                <button onClick={handleSubmit} className="btn text-white bg-primary-300 font_weight_500 px-3 py-2">
                    Submit
                </button>
            </div>
        </div>
    );
}
