import React from "react";

export interface CapitalCalculation {
    label: string;
    currency: string;
    amount: string;
    percentage: string;
}

interface Props {
    capitalCalculations: CapitalCalculation[];
    accountName?: string;
}

const CapitalCalculationsCard: React.FC<Props> = ({
                                                      capitalCalculations,
                                                      accountName = "Sam",
                                                  }) => {
    return (
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12">
            <div className="box-12 ms-0 position-relative">
                <div className="dashboard-overall-performance-card">
                    <div className="amounts mt-5">
                        <table className="table mt-2" style={{ borderCollapse: "collapse" }}>
                            <thead className="position-absolute top-10">
                            <tr>
                                <th
                                    className="font_Epilogue heading-16 font_weight_400 line_height_32"
                                    colSpan={3}
                                >
                                    Account Name
                                </th>
                                <th className="font_Epilogue heading-16 font_weight_400 line_height_32">
                                    {accountName}
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {capitalCalculations.map((row, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "background_grey_color" : ""}
                                >
                                    <td>{row.label}</td>
                                    <td>{row.currency}</td>
                                    <td>{row.amount}</td>
                                    <td>{row.percentage}</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CapitalCalculationsCard;
