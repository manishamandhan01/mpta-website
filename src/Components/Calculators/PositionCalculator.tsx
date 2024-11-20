export const PositionCalculator = () => {
    return (
        <>

            <div className="min-h-screen tw-gradient-to: rgb(255 255 255 / 0) var(--tw-gradient-to-position) flex items-center justify-center p-8">
                <div className="bg-white shadow-lg rounded-lg w-full max-w-screen-2xl p-12 ">
                    <div className="flex space-x-6">
                        <h1 className="text-5xl font-bold text-green-500 text-center mb-4">Position Size </h1>
                        <h1 className="text-3xl font-medium text-gray-800 text-center mt-3">Calculator </h1>

                    </div>

                    <p className="text-gray-600 text-sm mb-6 text-center">This calculator can be used to find out how
                        many stocks to buy when trading intraday as per Risk Management and Money Management Rules. Just
                        enter Total capital and Stop loss for trade and calculator will calculate how many stocks to
                        buy.</p>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Risk Tier (% Capital at Risk)<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Entry Price<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                 Stop Price<span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                className="mt-1 w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">
                                Target Price (estimate)<span className="text-red-500">*</span>
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
                        <div className="bg-gray-200 flex items-center  rounded-2xl justify-center p-8 " >
                            <form className="space-y-10">
                                <h4 className="text-2xl font-semibold text-gray-700  mb-12">
                                    Quantity of Stocks to Buy
                                </h4>
                                <h2 className="text-2xl font-bold text-blue-500 text-center ">50</h2>

                            </form>


                        </div>

                    </form>
                </div>

            </div>
        </>
    )
}