import React from 'react';
import {useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type ProfitLossData = {
    label: string;
    amount: number;
    percentage: number;
};

type OverallProfitLossCardProps = {
    data: ProfitLossData[];
    profitPercentage: number;
    lossPercentage: number;
};

const OverallProfitLossCard: React.FC<OverallProfitLossCardProps> = ({
                                                                         data,
                                                                         profitPercentage,
                                                                         lossPercentage,
                                                                     }) => {
    const {tradingSetting} = useGlobalStore();
    const getAmountClass = (amount: number) => {
        return amount < 0 ? 'text-danger' : 'text-success';
    };

    const getPercentageClass = (percentage: number) => {
        return percentage < 0 ? 'text-danger' : 'text-success';
    };

    return (
        <div className="col-xl-4 col-md-6 col-sm-12">
            <div className="box-12 ms-0 position-relative">
                <div className="dashboard-overall-performance-card">
                    <p>OVERALL PROFIT/LOSS</p>
                    <div className="amounts mt-3">
                        <table className="table mt-2" style={{ borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th className="font_Epilogue" style={{ fontSize: '15px' }}></th>
                                <th className="font_Epilogue" colSpan={2} style={{ fontSize: '15px' }}>
                                    Profit
                                </th>
                                <th className="font_Epilogue" style={{ fontSize: '15px' }}>
                                    Profit%
                                </th>
                                <th className="font_Epilogue" style={{ fontSize: '15px' }}></th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((row, index) => (
                                <tr key={index} className={index % 2 === 0 ? 'background_grey_color' : ''}>
                                    <td>{row.label}</td>
                                    <td>{tradingSetting.currencySymbol}</td>
                                    <td className={getAmountClass(row.amount)}>{row.amount.toLocaleString()}</td>
                                    <td className={getPercentageClass(row.percentage)}>{row.percentage.toFixed(2)}%</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        <div
                            className="profit-loss-bar mw-75 m-auto"
                            style={{
                                background: `linear-gradient(to right, green ${profitPercentage}%, red ${lossPercentage}%)`,
                                width: '100%',
                                height: '20px',
                                borderRadius: '1px',
                                marginTop: '3px',
                            }}
                        ></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OverallProfitLossCard;
