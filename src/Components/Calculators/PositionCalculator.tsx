import React from "react";
import { PositionCalculatorModel } from "../Models/PositionCalculatorModel.tsx";
import {CPSModel, CPSResultModel} from "@Components/Utils/Constants.tsx";
import {PositionCalculatorResultModel} from "@Components/Models/PositionCalculatorResultModel.tsx";
import {PositionCalculatorResultB} from "@Components/Calculators/PositionCalculatorResult(B).tsx";

export const PositionCalculator = () => {
    const [formData, setFormData] = React.useState<PositionCalculatorModel>(CPSModel);
    const [showResult, setShowResult] = React.useState(false);
    const [pSResult , setPSResult] = React.useState<PositionCalculatorResultModel[]>(CPSResultModel);
    const [rtrResult , setRtrResult] = React.useState<number>(0.0);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "riskTier" || name === "entryPrice" || name === "stopPrice" || name === "targetPrice" || name === "accountBalance"
                ? Number(value)
                : value,
        }));
    };

    const handleCalculate = () => {
        setShowResult(true);
        fetch('http://localhost:8000/calculators/position_size_calculator/get_results?format=json',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(json => {
                setPSResult(json["calculations"]);
                setRtrResult(json["risk_to_reward_ratio"]);
                // console.log(pSResult);

            })
            .catch(err => console.log(err));
    };


    const handleReset = () => {
        setShowResult(false);
        setFormData(CPSModel);
    };

    return (
        <div className=" bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-5xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-500">Position Size Calculator</h1>
                    <p className="text-gray-600 mt-2">
                        Calculate how many stocks to buy based on your risk and account balance.
                    </p>
                </div>

                {/* Form */}
                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Risk Tier (% Capital at Risk) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="riskTier"
                                value={formData.riskTier}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Risk Tier"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Entry Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="entryPrice"
                                value={formData.entryPrice}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Entry Price"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Ticker <span className="text-red-500">*</span>
                            </label>
                            <textarea
                                name="ticker"
                                value={formData.ticker}
                                onChange={handleInputChange}
                                className="w-full h-12 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Ticker"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Stop Price <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="stopPrice"
                                value={formData.stopPrice}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Stop Price"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Target Price (Estimate) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="targetPrice"
                                value={formData.targetPrice}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Target Price"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Account Balance <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="accountBalance"
                                value={formData.accountBalance}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                aria-label="Account Balance"
                            />
                        </div>
                    </div>
                </form>

                {/* Buttons */}
                <div className="mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <button
                        type="button"
                        onClick={handleCalculate}
                        className="w-full md:w-auto bg-blue-500 text-white py-3 px-6 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        Calculate
                    </button>
                    <button
                        type="button"
                        onClick={handleReset}
                        className="w-full md:w-auto bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                    >
                        Reset
                    </button>
                </div>

                {/* Results */}
                {showResult && (
                    <div className="mt-10">
                        <PositionCalculatorResultB  formData={pSResult} rtrResult={rtrResult} />
                    </div>
                )}
            </div>
        </div>
    );
};
