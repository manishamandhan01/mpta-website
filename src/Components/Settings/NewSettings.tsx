import React, { useState } from "react";
import Button from "@mui/material/Button";

export default function SettingsPanel() {
    const [formData, setFormData] = useState({
        name: "Sam",
        interval: "2%",
        yAxisGap: "0%",
        noOfTrades: 100,
        currencySymbol: "Php",
        retainFormula: 20,
        rowsToAdd: 100,
        winLossCount: 50,
        reportDate: "Last Trade Data",
        setupSettings: [
            { setup: "Momentum", definition: "" },
            { setup: "Bounce", definition: "" },
            { setup: "Trend Follow", definition: "" },
            { setup: "Swing Trade", definition: "" },
            { setup: "Bottom fishing", definition: "" }
        ],
        noteDefaults: [
            { reason: "Time-stop" },
            { reason: "Breakout entry Hit" },
            { reason: "BO+Volume+RSI" },
            { reason: "Tranche Buy" },
            { reason: "Lock in Profit" }
        ],
        evaluationSettings: [
            { entryExit: "TOO EARLY", score1: -1, emotion: "FEAR", score2: -1 },
            { entryExit: "TOO LATE", score1: -1, emotion: "HOPE", score2: -1 },
            { entryExit: "NOT IN PLAN", score1: -1, emotion: "GREED", score2: -1 },
            { entryExit: "AS PLANNED", score1: 1, emotion: "BORED", score2: 1 },
            { entryExit: "BROKE RULES", score1: -1, emotion: "IMPULSE", score2: -1 },
            { entryExit: "NEWS", score1: -1, emotion: "FOMO", score2: -1 },
            { entryExit: "FUNDA", score1: 1, emotion: "CONFIDENT", score2: 1 }
        ]
    });

    const handleSetupChange = (index, key, value) => {
        const updated = [...formData.setupSettings];
        updated[index][key] = value;
        setFormData({ ...formData, setupSettings: updated });
    };

    const handleNoteChange = (index, value) => {
        const updated = [...formData.noteDefaults];
        updated[index].reason = value;
        setFormData({ ...formData, noteDefaults: updated });
    };

    const handleEvaluationChange = (index, key, value) => {
        const updated = [...formData.evaluationSettings];
        updated[index][key] = key.includes("score") ? parseInt(value) : value;
        setFormData({ ...formData, evaluationSettings: updated });
    };

    const addSetupRow = () => {
        setFormData({
            ...formData,
            setupSettings: [...formData.setupSettings, { setup: "", definition: "" }]
        });
    };

    const addNoteRow = () => {
        setFormData({
            ...formData,
            noteDefaults: [...formData.noteDefaults, { reason: "" }]
        });
    };

    const addEvaluationRow = () => {
        setFormData({
            ...formData,
            evaluationSettings: [...formData.evaluationSettings, { entryExit: "", score1: 0, emotion: "", score2: 0 }]
        });
    };

    const handleSubmit = () => {
        console.log("Data submitted:", formData);
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
                            <input className="border p-1" value={formData.interval}
                                   onChange={e => setFormData({...formData, interval: e.target.value})}/>
                            <label>Y Axis Gap</label>
                            <input className="border p-1" value={formData.yAxisGap}
                                   onChange={e => setFormData({...formData, yAxisGap: e.target.value})}/>
                            <label>No. of Trades</label>
                            <input className="border p-1" type="number" value={formData.noOfTrades}
                                   onChange={e => setFormData({...formData, noOfTrades: parseInt(e.target.value)})}/>
                        </div>
                    </div>

                    {/* Currency Settings */}
                    <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 card   position-relative ">
                        <div className="text-lg font-bold mb-2">Currency Settings</div>
                        <label>Currency Symbol</label>
                        <input className="border p-1" value={formData.currencySymbol}
                               onChange={e => setFormData({...formData, currencySymbol: e.target.value})}/>
                        <div className="mt-2">Preview: {formData.currencySymbol}</div>
                    </div>

                    {/* Log Settings */}
                    <div className="col-xl-2 col-lg-6 col-md-6 col-sm-12 card  position-relative ">
                        <div className="text-lg font-bold mb-2">Log Settings</div>
                        <label>Retain Formula</label>
                        <input className="border p-1" type="number" value={formData.retainFormula}
                               onChange={e => setFormData({...formData, retainFormula: parseInt(e.target.value)})}/>
                        <label>Rows to Add</label>
                        <input className="border p-1" type="number" value={formData.rowsToAdd}
                               onChange={e => setFormData({...formData, rowsToAdd: parseInt(e.target.value)})}/>
                    </div>

                    {/* Stats Settings */}
                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 card  position-relative ">
                        <div className="text-lg font-bold mb-2">Stats Settings</div>
                        <label>W/L Count</label>
                        <input className="border p-1" value="Per Tranche" disabled/>
                        <label>Last No. of Trades</label>
                        <input className="border p-1" type="number" value={formData.winLossCount}
                               onChange={e => setFormData({...formData, winLossCount: parseInt(e.target.value)})}/>
                    </div>
                </div>
                <div className="row col-12 gap-10px  main-trade-log-cards m-auto mt-4  ">

                    {/* Report Date Settings */}
                    <div className="col-xl-4 col-lg-6 col-md-6 col-sm-12 card  position-relative ">
                        <div className="text-lg font-bold mb-2">Report Date Settings</div>
                        <label>Report Date</label>
                        <input className="border p-1" value={formData.reportDate}
                               onChange={e => setFormData({...formData, reportDate: e.target.value})}/>


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
                            {formData.setupSettings.map((row, index) => (
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
                {formData.noteDefaults.map((item, index) => (
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
                            {formData.evaluationSettings.map((row, index) => (
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
