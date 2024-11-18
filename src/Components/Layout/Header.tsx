export const Header = () => {
    return (

        <>
            <header className="fixed w-screen bg-sky-950 shadow-lg -mt-2 top-0 left-0 z-50">
                <div className="flex items-center justify-between px-8 py-4">
                    <div className="flex items-center space-x-4">
                        <a  href="#">
                            <img className="w-12 h-12 rounded-full"
                                 src="https://www.shutterstock.com/image-vector/mp-pm-abstract-outstanding-professional-260nw-1942914580.jpg"
                                 width="30" height="40" alt="NerdWallet Home Page" title="NerdWallet Home Page"
                                 loading="eager"/>
                                                   </a>
                            <h1 className="text-white text-2xl font-bold tracking-wide">Trade Analyzer</h1>

                    </div>
                    <nav>
                    <ul className="flex space-x-8 text-lg text-gray-200 font-medium">
                            {["Home", "Calculators", "Markets", "News", "Brokers", "More"].map((item) => (
                                <li key={item}>
                                    <button className="hover:text-white transition duration-300">{item}</button>
                                </li>
                            ))}


                        </ul>
                    </nav>
                    <div className="flex items-center space-x-4">

                        <button
                            className="px-4 py-2 text-gray-800 bg-yellow-500 rounded-lg font-semibold hover:bg-yellow-600 transition duration-300">Sign
                            In
                        </button>
                        <button
                            className="px-4 py-2 text-gray-800 bg-green-500 rounded-lg font-semibold hover:bg-green-600 transition duration-300">Sign
                            Up
                        </button>
                    </div>
                </div>
            </header>

        </>
)

}