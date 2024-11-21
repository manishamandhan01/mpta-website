import {useState} from "react";


export const Header = () => {
    const navigationItems = [
        {
            mainHeading: {name: "Home", href: "home"},
        },
        {
            mainHeading: {name: "Tools"},
            nestedHeading: {name: "Calculator", href: "calculators"},
        },
    ];

    const [activeDropDown, setActiveDropDown] = useState<string | null>(null);

    const handleDropdown = (itemName: string) => {
        setActiveDropDown(activeDropDown === itemName ? null : itemName);
    };

    return (
        <header className="fixed w-screen h-24 bg-white shadow-lg shadow-blue-200  top-0 left-0 z-50">
            <div className="flex items-center justify-between px-8 py-4">
                <div className="flex items-center space-x-4">
                    <a href="#">
                        <img
                            className="w-12 h-12 rounded-full"
                            src="https://www.shutterstock.com/image-vector/mp-pm-abstract-outstanding-professional-260nw-1942914580.jpg"
                            alt="Logo"
                            loading="eager"
                        />
                    </a>
                    <h1 className="text-blue-600 text-2xl font-bold tracking-wide">
                        Trade Analyzer
                    </h1>
                </div>
                <nav>
                    <ul className="flex space-x-8 text-lg text-black-50 font-medium">
                        {navigationItems.map((item, index) => (
                            <li key={index} className="relative">
                                {item.mainHeading.name === "Home" ? (
                                    <a href={item.mainHeading.href}
                                       className="flex items-center space-x-2 hover:text-white transition duration-300"
                                    >
                                        {item.mainHeading.name}
                                    </a>
                                ) : (<>
                                    <button
                                        className="flex items-center space-x-2 hover:text-white transition duration-300"
                                        onClick={() => handleDropdown(item.mainHeading.name)}
                                    >
                                        {item.mainHeading.name}
                                    </button>
                                    {activeDropDown === item.mainHeading.name && item.nestedHeading && (
                                        <div className="absolute mt-2 bg-white shadow-md rounded-lg py-2 w-40">
                                            <a
                                                href={item.nestedHeading.href}
                                                className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                                            >
                                                {item.nestedHeading.name}
                                            </a>
                                        </div>
                                    )}

                                </>)}


                            </li>
                        ))}
                    </ul>
                </nav>
                <div className="flex items-center space-x-4">
                    <button
                        className="px-4 py-2 text-white bg-blue-400 rounded-lg font-semibold hover:bg-blue-600 transition duration-300">
                        Sign In
                    </button>
                    <button
                        className="px-4 py-2 text-white bg-gray-400 rounded-lg font-semibold hover:bg-gray-600 transition duration-300">
                        Sign Up
                    </button>
                </div>
            </div>
        </header>
    );
};
