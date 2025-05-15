import React from "react";

type BankTransferData = {
    title: string;
    month: string;
    total_deposits: number | null;
    total_withdrawals: number | null;
    dividend: number | null;
    total_profit_loss: number | null;
    total_equity: number | null;
};

type BankTransferCumulatives = {
    previous_cumulative: BankTransferData;
    this_period: BankTransferData;
    total_cumulative: BankTransferData;
};

type Props = {
    bank_transfer_cumulatives: BankTransferCumulatives | null;
};

const formatCurrency = (value: number | null): string => {
    if (value === null) return "-";
    return value.toLocaleString("en-IN");
};

const getColorClass = (value: number | null): string => {
    if (value === null) return "";
    return value < 0 ? "text-danger" : "text-success";
};

const BankTransferSummaryCard: React.FC<Props> = ({ bank_transfer_cumulatives }) => {
    if (!bank_transfer_cumulatives) {
        return (
            <div className="p-3 bg-light text-center text-muted rounded">
                Loading or No Data
            </div>
        );
    }

    const { previous_cumulative, this_period, total_cumulative } = bank_transfer_cumulatives;

    const rows = [
        { label: "Total Deposits", key: "total_deposits" },
        { label: "Total Withdrawals", key: "total_withdrawals" },
        { label: "Dividend", key: "dividend" },
        { label: "Total Profit/Loss", key: "total_profit_loss" },
        { label: "Total Equity", key: "total_equity" },
    ];

    const columns = [previous_cumulative, this_period, total_cumulative];

    return (
        <div className="col-xl-8 col-md-7 col-sm-12">
            <div className="position-relative ms-0 box-12">
                <div className="dashboard-overall-performance-card">
                    <div className="d-flex justify-content-between text-center mw-50 m-auto">
                        {columns.map((col, idx) => (
                            <div key={idx}>
                                <p className="mb-0 fw-bold">{col.title.toUpperCase()}</p>
                                <p className="text-muted">{col.month}</p>
                            </div>
                        ))}
                    </div>

                    <div className="amounts mt-4 d-flex flex-row">
                        <table className="table mt-2" style={{ borderCollapse: "collapse" }}>
                            <thead>
                            <tr>
                                <th></th>
                                {columns.map((_, idx) => (
                                    <th key={idx}></th>
                                ))}
                            </tr>
                            </thead>
                            <tbody>
                            {rows.map((row, rowIndex) => (
                                <tr className="background_grey_color" key={rowIndex}>
                                    <td className="fw-medium">{row.label}</td>
                                    {columns.map((col, colIndex) => {
                                        const val = col[row.key as keyof BankTransferData] as number | null;
                                        const isEquity = row.key === "total_equity";
                                        return (
                                            <td
                                                key={colIndex}
                                                className={`${
                                                    isEquity ? "fw-bold" : getColorClass(val)
                                                }`}
                                            >
                                                Php {formatCurrency(val)}
                                            </td>
                                        );
                                    })}
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/*<div className="ms-5 me-5 d-flex flex-column justify-content-start align-items-center">*/}
                        {/*    <button className="circle-btn bg-light m-0 border">*/}
                        {/*        <i className="fa-solid fa-arrow-up icon-black icon-large-20"></i>*/}
                        {/*    </button>*/}
                        {/*    <button className="circle-btn bg-light m-0 mt-3 border">*/}
                        {/*        <i className="fa-solid fa-arrow-down icon-black icon-large-20"></i>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BankTransferSummaryCard;
