import React from "react";

export interface DividendCumulative {
    symbol: string;
    count: number;
    amount: number;
}

interface Props {
    data: DividendCumulative[];
}

const DividendCumulativesCard: React.FC<Props> = ({ data }) => {
    return (
        <div className="col-xl-4 col-lg-6 col-md-7 col-sm-12">
            <div className="portfolio-card-container position-relative box-12">
                <div className="dashboard-overall-performance-card">
                    <div className="amounts mt-5">
                        <table className="table mt-2" style={{ borderCollapse: "collapse" }}>
                            <thead className="position-absolute top-10">
                            <tr>
                                <th className="font_Epilogue" style={{ fontSize: "15px" }}>Symbol</th>
                                <th className="font_Epilogue" style={{ fontSize: "15px" }}>Count</th>
                                <th className="font_Epilogue" style={{ fontSize: "15px" }} colSpan={2}>Total Amount</th>
                            </tr>
                            </thead>
                            <tbody>
                            {data.map((entry, index) => (
                                <tr
                                    key={index}
                                    className={index % 2 === 0 ? "background_grey_color" : ""}
                                >
                                    <td>{entry.symbol}</td>
                                    <td>{entry.count}</td>
                                    <td>$</td>
                                    <td>{entry.amount.toLocaleString()}</td>
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

export default DividendCumulativesCard;
