
export const MiddleSection = () => {




    return (
        <div className="flex flex-col items-center justify-center min-h-screen space-y-96 mt-64">
            {/*First section*/}
            <div className="text-center p-8 shadow-lg rounded-lg max-w-3xl">
                <div>
                    <div className="text-center p-8 shadow-lg rounded-lg max-w-3xl relative">
                        <div
                            className="absolute top-0 left-1.5 right-3/4 -mt-6 text-[300px] font-bold text-black opacity-10 pointer-events-none">
                            1
                        </div>
                        <div>
                            <h1 className="text-3xl md:text-5xl font-bold text-sky-950">The Only <span
                                className="text-blue-600">Tool You Need</span> to
                                Become <span className="text-blue-600">Profitable</span></h1>
                        </div>
                        <div>
                            <div>
                                <p className="mt-4 text-blue-600 text-lg">
                                    MPTradeAnalyzer helps you discover your strengths and weaknesses to become a profitable
                                    trader with the power of journaling and analytics.
                                </p>
                            </div>
                        </div>
                        <a href="#" target="_blank"
                           className="inline-block mt-6 px-20 py-6 text-xl rounded-lg font-medium shadow-2xl transition duration-150 ease-in-out (.25,.46,.45,.94) bg-gradient-to-r from-gray-300 to-gray-700 hover:from-blue-300 hover:to-blue-900 text-white"


                        >
                            <div></div>
                            <div>Get Started Now<span
                            ></span></div>
                        </a>

                    </div>
                </div>
            </div>
            {/*second section*/}
            <div className="text-center p-8  shadow-lg rounded-lg max-w-3xl">
                    <div>
                        <div className="text-center p-8 shadow-lg rounded-lg max-w-3xl relative">
                            <div
                                className="absolute top-0 left-1.5 right-3/4 -mt-6 text-[300px] font-bold text-white opacity-20 pointer-events-none">
                                2
                            </div>
                            <div >
                                <div>
                                    <h1 className="text-3xl md:text-5xl font-bold text-white">Powerful and
                                    Automated </h1></div>
                                <div>
                                    <div><p className="mt-4 text-blue-600 text-lg">You focus on trading while we focus
                                        on helping you get better. With
                                        automated journaling, we do the heavy lifting for you.</p></div>
                                </div>
                                <a href="#" target="_blank"
                                   className="inline-block mt-6 px-12 py-6 text-xl rounded-lg font-medium shadow-2xl transition duration-150 ease-in-out (.25,.46,.45,.94) bg-gradient-to-r from-gray-300 to-gray-700 hover:from-blue-300 hover:to-blue-900 text-white"
                                >
                                    <div></div>
                                    <div>View All Brokers and Integerations<span
                                    ></span></div>
                                </a>

                            </div>
                        </div>
                    </div>
            </div>


        </div>
    )
}