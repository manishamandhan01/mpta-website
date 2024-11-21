import React from "react";
import {PositionCalculatorResult} from "./RBCalculatorResult.tsx";

export const PositionCalculator = () => {
    const [showResult, setShowResult] = React.useState(false);

    const handleCalculate = () => {
        setShowResult(true);
    };
    const handleReset =( )=>{
        setShowResult(false);
    }

    return (
        // <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-400 flex items-center justify-center p-5">
            <div className="bg-white m-4 shadow-2xl rounded-lg w-full max-w-screen-2xl p-12">
                <div className="flex space-x-6">
                    <h1 className="text-5xl font-bold text-green-500 text-center mb-4">Position Size </h1>
                    <h1 className="text-3xl font-medium text-gray-800 text-center mt-3">Calculator </h1>
                </div>
                <p className="text-gray-600 text-md-center mb-6 text-center">
                    This calculator can be used to find out how many stocks to buy when trading intraday as per Risk
                    Management and Money Management Rules. Just enter Total capital and Stop loss for trade, and the
                    calculator will calculate how many stocks to buy.
                </p>


                    <form className="space-y-10">
                        <div className="flex flex-row space-x-8">
                            {/* Left Column */}
                            <div className="flex flex-col gap-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Risk Tier (% Capital at Risk)<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Entry Price<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="flex flex-col gap-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Stop Price<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700">
                                        Target Price (estimate)<span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="number"
                                        className="w-96 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            className="w-64 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            onClick={handleCalculate}
                        >
                            Calculate
                        </button>
                    </form>
                {showResult && (
                    <div className="mt-10">
                    <PositionCalculatorResult reset={handleReset} />
                    </div>


                )}

            </div>
        // </div>
    );
};
