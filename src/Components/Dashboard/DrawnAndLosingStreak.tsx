// @flow
import * as React from 'react';

type Props = {};

export const DrawnAndLosingStreak = (props: Props) => {
    const [totalProfitLoss, setTotalProfitLoss] = React.useState(1234); // dummy data
    const [totalProfitLossPer, setTotalProfitLossPer] = React.useState(15); // dummy data

    const data = [
        { label: "Max.Drawdown" },
        { label: "Consecutive Wins" },
        { label: "Consecutives Losses" },
        { label: "Max. Consecutives Profit" },
        { label: "Max. Consecutives Loss" },
    ];

    const profitClass = totalProfitLoss >= 0 ? 'total_gain_row' : 'total_loss_row';

    return (
            <div className="">
                <div className="">
                    <div className=" dashboard-overall-performance-card ">

                        <div className="main_heading_card_inside">
                            <h1 className="font_poppins heading-20 line_height_32 text-left font_weight_400 mt-2  ">
                                DrawDown And Losing Streaks Performance
                            </h1>
                        </div>
                        <div className="main_heading_card_inside mb-5">
                            <hr/>
                        </div>
                        <div className=" mt-4 mb-5 ">
                            {data.map((item, idx) => {
                                const rowBg = idx % 2 === 0 ? 'bg-white' : 'bg-light'; // Alternating background
                                return (
                                    <div key={idx}
                                         className={`d-flex flex-row justify-content-between ${rowBg} align-items-center `}>
                                        <p className="mb-4 heading-16 font_poppins line_height_20 font_weight_400">{item.label}:</p>
                                        <p className={`mb-0 heading-16 font_poppins line_height_20 font_weight_400 ${profitClass}`}>${totalProfitLoss}</p>
                                        <p className={`mb-0  heading-16 font_poppins line_height_20 font_weight_400${profitClass}`}>{totalProfitLossPer}%</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
    );
};
