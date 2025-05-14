import React from "react";

type StockPosition = {
    weight_percentage: number;
    symbol: string;
    average_price: number;
    total_shares: number;
    amount: number;
    stop_loss: number;
    target_price: number;
};

type SLTPCalculatorCardProps = {
    positions: StockPosition[];
};

const SLTPCalculatorCard: React.FC<SLTPCalculatorCardProps> = ({ positions }) => {
    return (
        <div className="col-xl-2 col-lg-6 col-md-5 col-sm-12">
            <div className="position-relative ms-0 box-12">
                <div className="dashboard-overall-performance-card">
                    <div className="amounts mt-5">
                        <table className="table mt-2" style={{ borderCollapse: "collapse" }}>
                            <thead className="position-absolute top-10">
                            <tr>
                                <th className="font_Epilogue heading-16 font_weight_400 line_height_32" style={{ fontSize: "15px" }}>
                                    SL & TP Calculator
                                </th>
                                <th>
                                    <svg width="30" height="30" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M16.3249 12.9167L14.8082 11.8333C15.0582 10.9333 15.0749 9.95833 14.8082 8.98333L16.3249 7.91667L15.1166 5.83333L13.4249 6.6C12.7666 5.93333 11.9332 5.41667 10.9582 5.175L10.7916 3.33333H8.3749L8.20824 5.175C7.23324 5.41667 6.3999 5.93333 5.74157 6.6L4.0499 5.83333L2.84157 7.91667L4.35824 8.98333C4.09157 9.95833 4.10824 10.9333 4.35824 11.8333L2.84157 12.9167L4.0499 15L5.74157 14.225C6.3999 14.8833 7.23324 15.3833 8.20824 15.6417L8.3749 17.5H10.7916L10.9582 15.6417C11.9332 15.3833 12.7666 14.8833 13.4249 14.225L15.1166 15L16.3249 12.9167ZM11.2499 2.5C11.4749 2.5 11.6666 2.66667 11.6666 2.88333L11.8166 4.58333C12.4499 4.81667 13.0166 5.15833 13.5249 5.56667L15.0666 4.84167C15.2582 4.74167 15.4999 4.80833 15.6166 5L17.2832 7.91667C17.3999 8.09167 17.3332 8.33333 17.1499 8.45833L15.7582 9.43333C15.8666 10.1 15.8582 10.7583 15.7582 11.4L17.1499 12.375C17.3332 12.5 17.3999 12.7417 17.2832 12.9167L15.6166 15.8333C15.4999 16.0083 15.2582 16.075 15.0666 15.975L13.5249 15.2583C13.0166 15.6667 12.4499 16 11.8166 16.25L11.6666 17.9167C11.6666 18.1583 11.4749 18.3333 11.2499 18.3333H7.91657C7.80606 18.3333 7.70008 18.2894 7.62194 18.2113C7.5438 18.1332 7.4999 18.0272 7.4999 17.9167L7.3499 16.25C6.71657 16 6.1499 15.6667 5.64157 15.2583L4.0999 15.975C3.90824 16.075 3.66657 16.0083 3.5499 15.8333L1.88324 12.9167C1.76657 12.7417 1.83324 12.5 2.01657 12.375L3.40824 11.4C3.30824 10.7583 3.2999 10.1 3.40824 9.43333L2.01657 8.45833C1.83324 8.33333 1.76657 8.09167 1.88324 7.91667L3.5499 5C3.66657 4.80833 3.90824 4.74167 4.0999 4.84167L5.64157 5.56667C6.1499 5.15833 6.71657 4.81667 7.3499 4.58333L7.4999 2.88333C7.4999 2.66667 7.69157 2.5 7.91657 2.5H11.2499Z"
                                            fill="black"
                                        />
                                    </svg>
                                </th>
                            </tr>
                            </thead>
                            <thead>
                            <tr>
                                <th className="font_Epilogue text-center font_weight_500" style={{ fontSize: "15px" }}>
                                    Stop Loss
                                </th>
                                <th className="font_Epilogue text-center font_weight_500" style={{ fontSize: "15px" }}>
                                    Target Price
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {positions.map((position, index) => (
                                <tr key={index} className={index % 2 === 0 ? "background_grey_color" : ""}>
                                    <td className="total_loss_row text-center">{position.stop_loss.toFixed(2)}</td>
                                    <td className="total_gain_row text-center">{position.target_price.toFixed(2)}</td>
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

export default SLTPCalculatorCard;
