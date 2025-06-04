type StockData = {
    symbol: string;
    cumulative: number | string;
    trades: string;
    winRate: string;
    profitFactor: string;
    expectancy: string;
    average_days: number | string;
    average_allocation_percentage: string;
    average_win_percentage: string;
    average_loss_percentage: string;
};

type Props = {
    stockData: StockData[];
    sortOption: 'Most Trades' | 'Top Trades' | 'Worst Trades';
    setSortOption: (option: 'Most Trades' | 'Top Trades' | 'Worst Trades') => void;
};

const StockPerformanceTableCard: React.FC<Props> = ({ stockData, sortOption, setSortOption }) => {
    return (
        <div className="col-xl-8 col-lg-12 col-md-12 col-sm-12">
            <div className="portfolio-card-container position-relative me-5 overflow-x-auto">
                <div className="dashboard-overall-performance-card">
                    <div className="d-flex justify-content-between text-center m-auto">
                        <div className="d-flex flex-row align-items-center">
                            <p className="heading-20 mb-0">Sort</p>
                            <p className="heading-20 mb-0 ms-2">Symbol</p>
                            <select
                                className="ms-3 form-select"
                                value={sortOption}
                                onChange={(e) => setSortOption(e.target.value as any)}
                            >
                                <option value="Most Trades">Most Trades</option>
                                <option value="Top Trades">Top Trades</option>
                                <option value="Worst Trades">Worst Trades</option>
                            </select>
                        </div>
                    </div>

                    <div className="amounts mt-4 mr-82 d-flex flex-row">
                        <table className="table mt-2" style={{ borderCollapse: 'collapse' }}>
                            <thead>
                            <tr>
                                <th className="text-center">Stock Code</th>
                                <th className="text-center">Profit</th>
                                <th className="text-center">Trade(Win%)</th>
                                <th className="text-center">Win Rate %</th>
                                <th className="text-center">Average Days</th>
                                {/*<th className="text-center">Average Allocation</th>*/}
                                {/*<th className="text-center">Average Win%</th>*/}
                                {/*<th className="text-center">Average Loss%</th>*/}
                            </tr>
                            </thead>
                            <tbody>
                            {stockData.map((item, index) => (
                                <tr key={index} className="text-center">
                                    <td>{item.symbol}</td>
                                    <td>{item.cumulative}</td>
                                    <td>{item.trades}</td>
                                    <td>{item.winRate}</td>
                                    <td>{item.average_days}</td>
                                    {/*<td>{item.average_allocation_percentage}</td>*/}
                                    {/*<td>{item.average_win_percentage}</td>*/}
                                    {/*<td>{item.average_loss_percentage}</td>*/}
                                </tr>
                            ))}
                            </tbody>
                        </table>

                        {/*<div className="ms-5 me-5">*/}
                        {/*    <button className="circle-btn bg-light mt-5">*/}
                        {/*        <i className="fa-solid fa-arrow-up icon-black icon-large-20"></i>*/}
                        {/*    </button>*/}
                        {/*    <button className="circle-btn bg-light mt-5">*/}
                        {/*        <i className="fa-solid fa-arrow-down icon-black icon-large-20"></i>*/}
                        {/*    </button>*/}
                        {/*</div>*/}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StockPerformanceTableCard;
