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

            <div className="flex flex-wrap gap-4">

                {/* Distribution Chart Settings */}
                <div className="flex-1 min-w-[300px] border p-4 rounded-2xl shadow">
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
                <div className="flex-1 min-w-[300px] border p-4 rounded-2xl shadow">
                    <div className="text-lg font-bold mb-2">Currency Settings</div>
                    <label>Currency Symbol</label>
                    <input className="border p-1" value={formData.currencySymbol}
                           onChange={e => setFormData({...formData, currencySymbol: e.target.value})}/>
                    <div className="mt-2">Preview: {formData.currencySymbol}</div>
                </div>
            </div>

            {/* Log Settings */}
            <div className="col-span-1 border p-4 rounded-2xl shadow">
                <div className="text-lg font-bold mb-2">Log Settings</div>
                <label>Retain Formula</label>
                <input className="border p-1" type="number" value={formData.retainFormula}
                       onChange={e => setFormData({...formData, retainFormula: parseInt(e.target.value)})}/>
                <label>Rows to Add</label>
                <input className="border p-1" type="number" value={formData.rowsToAdd}
                       onChange={e => setFormData({...formData, rowsToAdd: parseInt(e.target.value)})}/>
            </div>

            {/* Stats Settings */}
            <div className="col-span-1 border p-4 rounded-2xl shadow">
                <div className="text-lg font-bold mb-2">Stats Settings</div>
                <label>W/L Count</label>
                <input className="border p-1" value="Per Tranche" disabled/>
                <label>Last No. of Trades</label>
                <input className="border p-1" type="number" value={formData.winLossCount}
                       onChange={e => setFormData({...formData, winLossCount: parseInt(e.target.value)})}/>
            </div>

            {/* Report Date Settings */}
            <div className="col-span-1 border p-4 rounded-2xl shadow">
                <div className="text-lg font-bold mb-2">Report Date Settings</div>
                <label>Report Date</label>
                <input className="border p-1" value={formData.reportDate}
                       onChange={e => setFormData({...formData, reportDate: e.target.value})}/>
            </div>

            {/* Setup Settings */}
            <div className="col-span-3 border p-4 rounded-2xl shadow">
                <div className="text-lg font-bold mb-2 flex justify-between items-center">
                    Setup Settings
                    <Button onClick={addSetupRow} size="small" variant="contained" color="success">+ Add</Button>
                </div>
                <div className="grid grid-cols-2 gap-2 font-semibold">
                    <div>Setup</div>
                    <div>Definition and Rules</div>
                </div>
                <div className="grid grid-cols-2 gap-2 mt-1">
                    {formData.setupSettings.map((row, index) => (
                        <React.Fragment key={index}>
                            <input className="border p-1" value={row.setup}
                                   onChange={e => handleSetupChange(index, "setup", e.target.value)}
                                   placeholder="Setup"/>
                            <input className="border p-1" value={row.definition}
                                   onChange={e => handleSetupChange(index, "definition", e.target.value)}
                                   placeholder="Definition and Rules"/>
                        </React.Fragment>
                    ))}
                </div>
            </div>

            {/* Note Default Settings */}
            <div className="col-span-1 border p-4 rounded-2xl shadow">
                <div className="text-lg font-bold mb-2 flex justify-between items-center">
                    Note Default Settings
                    <Button onClick={addNoteRow} size="small" variant="contained" color="success">+ Add</Button>
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
            <div className="col-span-2 border p-4 rounded-2xl shadow">
                <div className="text-lg font-bold mb-2 flex justify-between items-center">
                    Evaluation Settings
                    <Button onClick={addEvaluationRow} size="small" variant="contained" color="success">+ Add</Button>
                </div>
                <div className="grid grid-cols-4 gap-2 font-semibold">
                    <div>Entry/Exit</div>
                    <div>Score</div>
                    <div>Emotion</div>
                    <div>Score</div>
                </div>
                {formData.evaluationSettings.map((row, index) => (
                    <div key={index} className="grid grid-cols-4 gap-2 mt-1">
                        <input className="border p-1" value={row.entryExit}
                               onChange={e => handleEvaluationChange(index, "entryExit", e.target.value)}
                               placeholder="Entry/Exit"/>
                        <input className="border p-1" type="number" value={row.score1}
                               onChange={e => handleEvaluationChange(index, "score1", e.target.value)}
                               placeholder="Score"/>
                        <input className="border p-1" value={row.emotion}
                               onChange={e => handleEvaluationChange(index, "emotion", e.target.value)}
                               placeholder="Emotion"/>
                        <input className="border p-1" type="number" value={row.score2}
                               onChange={e => handleEvaluationChange(index, "score2", e.target.value)}
                               placeholder="Score"/>
                    </div>
                ))}
            </div>

            {/* Submit Button */}
            <div className="col-span-3 text-center mt-4">
                <Button onClick={handleSubmit} variant="contained" color="primary" size="large">
                    Submit
                </Button>
            </div>
        </div>
    );
}
