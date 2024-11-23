import { useState } from "react";

export const Header = () => {
    const navigationItems = [
        { mainHeading: { name: "Home", href: "home" } },
        { mainHeading: { name: "About", href: "home" } },
        { mainHeading: { name: "Products", href: "home" } },
        { mainHeading: { name: "Support", href: "home" } },
        {
            mainHeading: { name: "Tools" },
            nestedHeading: { name: "Calculator", href: "calculators" },
        },
    ];

    const [activeDropDown, setActiveDropDown] = useState<string | null>(null);

    const handleDropdown = (itemName: string) => {
        setActiveDropDown(activeDropDown === itemName ? null : itemName);
    };

    return (
        <header className="fixed w-full h-20 bg-gradient-to-r from-blue-50 to-blue-70 shadow-lg top-0 z-50">
            <div className="flex items-center justify-between px-6 md:px-12 py-4">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <a href="#" className="group">
                        <img
                            className="w-12 h-12 rounded-full shadow-md transform transition-transform group-hover:scale-105"
                            src="https://www.shutterstock.com/image-vector/mp-pm-abstract-outstanding-professional-260nw-1942914580.jpg"
                            alt="Logo"
                        />
                    </a>
                    <h1 className="text-blue-700 text-2xl font-bold tracking-wide group-hover:text-blue-800 transition-colors">
                        Trade Analyzer
                    </h1>
                </div>

                {/* Navigation Section */}
                <nav className="hidden md:flex space-x-8 text-lg font-medium">
                    {navigationItems.map((item, index) => (
                        <li key={index} className="relative group list-none">
                            {item.mainHeading.name === "Home" ? (
                                <a
                                    href={item.mainHeading.href}
                                    className="text-gray-700 hover:text-blue-600 font-serif transition-colors group-hover:underline underline-offset-4"
                                >
                                    {item.mainHeading.name}
                                </a>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleDropdown(item.mainHeading.name)}
                                        className="text-gray-700 hover:text-blue-600 font-serif flex items-center transition-colors"
                                    >
                                        {item.mainHeading.name}
                                        <svg
                                            className={`w-4 h-4 ml-1 transform transition-transform ${
                                                activeDropDown === item.mainHeading.name ? "rotate-180" : ""
                                            }`}
                                            fill="none"
                                            stroke="blue"
                                            strokeWidth="1"
                                            viewBox="0 0 24 24"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>
                                    {activeDropDown === item.mainHeading.name && item.nestedHeading && (
                                        <div
                                            className="absolute mt-2 bg-white shadow-lg rounded-md py-2 w-48 animate-fade-in">
                                            <a
                                                href={item.nestedHeading.href}
                                                className="block px-4 py-2 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition"
                                            >
                                                {item.nestedHeading.name}
                                            </a>
                                        </div>
                                    )}
                                </>
                            )}
                        </li>
                    ))}
                </nav>

                {/* Buttons Section */}
                {/*<div className="flex items-center space-x-4">*/}
                {/*    <button className="px-4 py-2 bg-blue-500 text-white rounded-lg font-semibold shadow-md hover:bg-blue-600 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition">*/}
                {/*        Sign In*/}
                {/*    </button>*/}
                {/*    <button className="px-4 py-2 bg-white border border-blue-500 text-blue-500 rounded-lg font-semibold shadow-md hover:bg-blue-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition">*/}
                {/*        Sign Up*/}
                {/*    </button>*/}
                {/*</div>*/}
            </div>
        </header>
    );
};
