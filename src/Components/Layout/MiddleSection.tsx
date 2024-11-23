
export const MiddleSection = () => {




    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-96 mt-64">
            {/*First section*/}
            <div className="text-center p-8 shadow-lg rounded-lg max-w-3xl">
                <div className="text-center p-8 shadow-lg rounded-lg max-w-3xl relative">
                    <div
                        className="absolute top-0 left-1.5 right-3/4 -mt-6 text-[300px] font-bold text-black opacity-10 pointer-events-none">
                        1
                    </div>
                    <div>
                        <h1 className="text-lg md:text-4xl font-bold text-sky-950">
                            Unleash Your Trading Potential with <span className="text-blue-600 md:text-2xl">MPTradeAnalyzer</span>
                        </h1>
                    </div>
                    <div>
                        <div>
                            <p className="mt-4 text-blue-600 text-lg">
                                Unlock insights that take your trading to the next level. MPTradeAnalyzer equips you
                                with the tools to analyze, track, and improve your trading strategy, turning weaknesses
                                into strengths and driving you toward profitability.
                            </p>
                        </div>
                    </div>
                    <a href="#" target="_blank"
                       className="inline-block mt-6 px-20 py-6 text-xl rounded-lg font-medium shadow-2xl transition duration-150 ease-in-out bg-gradient-to-r from-gray-300 to-gray-700 hover:from-blue-300 hover:to-blue-900 text-white">
                        Start Your Journey Today<span></span>
                    </a>
                </div>
            </div>

            {/*second section*/}
            <div className="text-center p-8 shadow-lg rounded-lg max-w-3xl">
                <div className="text-center p-8 shadow-lg rounded-lg max-w-3xl relative">
                    <div
                        className="absolute top-0 left-1.5 right-3/4 -mt-6 text-[300px] font-bold text-black opacity-10 pointer-events-none">
                        2
                    </div>
                    <div>
                        <div>
                            <h1 className="text-lg md:text-4xl font-bold text-sky-950">
                                Empower Your Trades with Smart Automation
                            </h1>
                        </div>
                        <div>
                            <div>
                                <p className="mt-4 text-blue-600 text-lg">
                                    Let automation handle the hard work. MPTradeAnalyzer takes care of journaling and
                                    analysis, so you can stay focused on refining your strategy and executing trades
                                    without distraction.
                                </p>
                            </div>
                        </div>
                        <a href="#" target="_blank"
                           className="inline-block mt-6 px-12 py-6 text-xl rounded-lg font-medium shadow-2xl transition duration-150 ease-in-out bg-gradient-to-r from-gray-300 to-gray-700 hover:from-blue-300 hover:to-blue-900 text-white">
                            Explore Our Broker Integrations<span></span>
                        </a>
                    </div>
                </div>
            </div>


        </div>
    )
}