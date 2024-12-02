import React from "react";
import {RBCalculatorModel} from "../Models/RBCalculatorModel.tsx";
import { CRBModel, CRBResultModel} from "@Components/Utils/Constants.tsx";
import {RBCalculatorResultModel} from "@Components/Models/RBCalculatorResultModel.tsx";
import {RBCalculatorResultB} from "@Components/Calculators/RBCalculatorResult(B).tsx";
import Swal from "sweetalert2";

export const RBCalculatorB = () => {
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
        if (formData.averageGain < formData.averageLoss) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Average % Gain must be higher than Average % Loss",
            });
        }
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
    // const handleReset = () => {
    //     setShowResult(false);
    //     setFormData(CRBModel);
    //
    // }

    return (
        <div className=" ">
            <div className="">
                {/* Header */}
                <div className=" calculator_main_heading mb-4">
                    <h1 className="font_poppins heading-40 line_height_32 text_primary_300 font_weight_700 mt-3 mb-3">Result
                        Based Calculator</h1>
                    <p className="font_poppins heading-16 text_light_gray">
                        Calculate how many stocks to buy based on your risk and account balance.
                    </p>
                </div>


                <form className="font_Epilogue row col-12 m-auto mb-5">
                    {/* Left Column */}

                    <div className="col-6" >
                        <label className="block text-sm font-medium text-gray-700">
                            Portfolio Size <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="portfolioSize"
                            value={formData.portfolioSize}
                            onChange={handleInputChange}
                            className=" p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"

                        />
                        </div>
                    <div className="col-6">

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
                    <div className="col-6">
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

                    {/* Right Column */}
                        <div className="col-6">
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
                        <div className="col-6">
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
                        <div className="col-6">
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
                    <div className="col-6">
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
                    {/*<div className="col-6">*/}
                    {/*    <label className="block text-sm font-medium text-gray-700">*/}
                    {/*        Biggest Losing <span className="text-red-500">*</span>*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        type="number"*/}
                    {/*        name="biggestLosing"*/}
                    {/*        value={formData.biggestLosing}*/}
                    {/*        onChange={handleInputChange}*/}
                    {/*        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"*/}
                    {/*    />*/}
                    {/*</div>*/}
                </form>


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
                {showResult && (
                    <div className="calculator_psition_result_main  ">
                        <RBCalculatorResultB formData={rB1Result} rB2Result={rB2Result} rB3Result={rB3Result} />
                    </div>
                )}
            </div>


        </div>
        // </div>
    );
};
