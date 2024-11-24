import React from "react";
import {RBCalculatorModel} from "../Models/RBCalculatorModel.tsx";
import {CPSResultModel, CRBModel, CRBResultModel} from "@Components/Utils/Constants.tsx";
import {PositionCalculatorResultModel} from "@Components/Models/PositionCalculatorResultModel.tsx";
import {RBCalculatorResultModel} from "@Components/Models/RBCalculatorResultModel.tsx";
import {RBCalculatorResult} from "@Components/Calculators/RBCalculatorResult.tsx";

export const RBCalculator = () => {
    const [showResult, setShowResult] = React.useState(false);
    const [formData, setFormData] = React.useState<RBCalculatorModel>(CRBModel);
    const [rB1Result , setRB1Result] = React.useState<RBCalculatorResultModel[]>(CRBResultModel);
    const [rB2Result , setRB2Result] = React.useState<RBCalculatorResultModel[]>(CRBResultModel);
    const [rB3Result , setRB3Result] = React.useState<RBCalculatorResultModel[]>(CRBResultModel);


 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
     const {name , value} = e.target;
     setFormData((prev) => ({
         ...prev,
         [name] : Number(value),
     }))
     console.log(formData);
 }

    const handleCalculate = () => {
        setShowResult(true);
        fetch('http://localhost:8000/calculators/result_based_calculator/get_results?format=json',{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        })
            .then(res => res.json())
            .then(json => {
                setRB1Result(json["table_1"]);
                setRB2Result(json["table_2"]);
                setRB3Result(json["table_3"]);
            })
            .catch(err => console.log(err));
    };
    const handleReset = () => {
        setShowResult(false);
        setFormData(CRBModel);

    }

    return (
        <div className=" bg-gradient-to-br from-gray-50 to-gray-200 flex items-center justify-center p-6">
            <div className="bg-white shadow-xl rounded-lg w-full max-w-5xl p-8">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-green-500">Result Based Calculator</h1>
                    <p className="text-gray-600 mt-2">
                        Calculate how many stocks to buy based on your risk and account balance.
                    </p>
                </div>


                <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Portfolio Size <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="portfolioSize"
                                value={formData.portfolioSize}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Position Size % <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="positionSize"
                                value={formData.positionSize}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Desired % return <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="desiredReturn"
                                value={formData.desiredReturn}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Average % Gain <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="averageGain"
                                value={formData.averageGain}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Average % Loss <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="averageLoss"
                                value={formData.averageLoss}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                % of Winning Trades <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="winningTrades"
                                value={formData.winningTrades}
                                onChange={handleInputChange}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Number of Trades <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="numberOfTrades"
                            value={formData.numberOfTrades}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">
                            Biggest Losing <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="biggestLosing"
                            value={formData.biggestLosing}
                            onChange={handleInputChange}
                            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        />
                    </div>
                </form>


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
                {showResult && (
                    <div className="mt-10">
                        <RBCalculatorResult formData={rB1Result} rB2Result={rB2Result} rB3Result={rB3Result} />
                    </div>
                )}
            </div>


        </div>
        // </div>
    );
};
