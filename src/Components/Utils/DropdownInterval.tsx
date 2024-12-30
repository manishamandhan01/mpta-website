import React, { useState } from "react";

export const DropdownInterval = () => {
    const [dropdownOpen, setDropdownOpen] = useState(false); // State to toggle the dropdown visibility

    const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

    return (
        <div className="dropdown">
            {/* Button to toggle the dropdown */}
            <button className="dropdown-button" onClick={toggleDropdown}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" width="28" height="28">
                    <path fill="currentColor" d="M13.5 6a8.5 8.5 0 1 0 0 17 8.5 8.5 0 0 0 0-17zM4 14.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"></path>
                    <path fill="currentColor" d="M9 14h4v-4h1v4h4v1h-4v4h-1v-4H9v-1z"></path>
                </svg>
            </button>

            {/* Dropdown menu */}
            {dropdownOpen && (
                <div className="dropdown-menu">
                    <button className="dropdown-item">Option 1</button>
                    <button className="dropdown-item">Option 2</button>
                    <button className="dropdown-item">Option 3</button>
                </div>
            )}
        </div>
    );
};
