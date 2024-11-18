export const PositionCalculator = () => {
    return (
        <>

            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-8">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                    <h1 className="text-2xl font-bold text-gray-800 text-center mb-4">Position Size Calculator</h1>
                    <p className="text-gray-600 text-sm mb-6 text-center">This calculator can be used to find out how
                        many stocks to buy when trading intraday as per Risk Management and Money Management Rules. Just
                        enter Total capital and Stop loss for trade and calculator will calculate how many stocks to
                        buy.</p>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Total Capital (excluding leverage) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Daily Risk in Percentage (%) ideally 1% <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Total number of trades per day (ideally 2) <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Stop Loss for Trade <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <button
                            type="button"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            Calculate
                        </button>
                    </form>
                </div>
                <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
                    <h4 className="text-lg font-semibold text-gray-700 mb-2">
                        Quantity of Stocks to Buy
                    </h4>
                    <h2 className="text-2xl font-bold text-blue-500">50</h2>
                </div>
            </div>
        </>
    )
}