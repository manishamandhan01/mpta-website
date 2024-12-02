import React from "react";
import {PositionCalculatorModel} from "../Models/PositionCalculatorModel.tsx";
import {CPSModel, CPSResultModel} from "@Components/Utils/Constants.tsx";
import {PositionCalculatorResultModel} from "@Components/Models/PositionCalculatorResultModel.tsx";
import {PositionCalculatorResultB} from "@Components/Calculators/PositionCalculatorResult(B).tsx";
import Swal from 'sweetalert2'

export const PositionCalculatorB = () => {
    const [formData, setFormData] = React.useState<PositionCalculatorModel>(CPSModel);
    const [showResult, setShowResult] = React.useState(false);
    const [pSResult, setPSResult] = React.useState<PositionCalculatorResultModel[]>(CPSResultModel);
    const [rtrResult, setRtrResult] = React.useState<number>(0.0);
    const [tradetype, setTradeType] = React.useState("Long");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === "riskTier" || name === "entryPrice" || name === "stopPrice" || name === "targetPrice" || name === "accountBalance"
                ? Number(value)
                : value,
        }));
    };
    const handleTrade =(e: React.ChangeEvent<HTMLSelectElement>) =>{
        const{value} = e.target;
        setTradeType(value);


    }

    const handleCalculate = () => {
        let validationFailed = false; 


        if (tradetype === "Long") {
            if (formData.targetPrice < formData.entryPrice) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Target price cannot be smaller than Entry price.",
                });
                validationFailed = true;
            } else if (formData.stopPrice > formData.entryPrice) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Stop price must be less than entry price",
                });
                validationFailed = true;
            }
        } else if (tradetype === "Short") {
            if (formData.targetPrice > formData.entryPrice) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Target price cannot be greater than Entry price.",
                });
                validationFailed = true;
            } else if (formData.stopPrice < formData.entryPrice) {
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Stop price must be higher than entry price",
                });
                validationFailed = true;
            }
        }

        if (validationFailed) {
            return;
        }
        setShowResult(true);
        fetch('http://localhost:8000/calculators/position_size_calculator/get_results?format=json', {
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


    // const handleReset = () => {
    //     setShowResult(false);
    //     setFormData(CPSModel);
    // };

    return (
        <div className=" ">
            <div className="">
                {/* Header */}
                <div className=" calculator_main_heading mb-4">
                    <h1 className="font_poppins heading-40 line_height_32 text_primary_300 font_weight_700 mt-3 mb-3">Position
                        Size Calculator</h1>
                    <p className="font_poppins heading-16 text_light_gray">
                        Calculate how many stocks to buy based on your risk and account balance.
                    </p>
                </div>

                {/* Form */}
                <form className="font_Epilogue row col-12 m-auto mb-5">
                    {/* Left Column */}

                    <div className="col-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Risk Tier (% Capital at Risk) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="riskTier"
                            value={formData.riskTier}
                            onChange={handleInputChange}
                            className=" p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Risk Tier"
                        />
                    </div>
                    <div className="col-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Trade <span className="text-red-500">*</span>
                        </label>
                        <select
                            className=" p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                        onChange={handleTrade }>
                            <option value="Long"
                            > Long
                            </option>
                            <option value="Short"
                            >Short
                            </option>
                        </select>

                    </div>
                    <div className="col-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Entry Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="entryPrice"
                            value={formData.entryPrice}
                            onChange={handleInputChange}
                            className=" p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Entry Price"
                        />


                    </div>
                    <div className="col-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Ticker <span className="text-red-500">*</span>
                        </label>
                        <textarea

                            name="ticker"
                            value={formData.ticker}
                            onChange={handleInputChange}
                            className=" textarea_ticker p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Ticker"
                        />
                    </div>

                    <div className="col-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Stop Price <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="stopPrice"
                            value={formData.stopPrice}
                            onChange={handleInputChange}
                            className=" p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Stop Price"
                        />
                    </div>
                    <div className="col-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Target Price (Estimate) <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="targetPrice"
                            value={formData.targetPrice}
                            onChange={handleInputChange}
                            className=" p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Target Price"
                        />
                    </div>
                    <div className="col-6">
                        <label className="block text-sm font-medium text-gray-700">
                            Account Balance <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="accountBalance"
                            value={formData.accountBalance}
                            onChange={handleInputChange}
                            className=" p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                            aria-label="Account Balance"
                        />
                    </div>
                </form>

                {/* Buttons */}
                <div className="calculator_cal_button">
                    <button
                        type="button"
                        onClick={handleCalculate}
                        className=" button_get_started btn text-white bg-primary-300 font_weight_500 heading-16  "
                    >
                        Calculate
                    </button>
                    {/*<button*/}
                    {/*    type="button"*/}
                    {/*    onClick={handleReset}*/}
                    {/*    className="w-full md:w-auto bg-gray-300 text-gray-700 py-3 px-6 rounded-lg hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"*/}
                    {/*>*/}
                    {/*    Reset*/}
                    {/*</button>*/}
                </div>

                {/* Results */}
                {showResult && (
                    <div className="calculator_psition_result_main ">
                        <PositionCalculatorResultB formData={pSResult} rtrResult={rtrResult}/>
                    </div>
                )}
            </div>
        </div>
    );
};
