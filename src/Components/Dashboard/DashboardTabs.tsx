import React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";

interface DashboardTabsProps {
    activeLabel: string;
    setActiveLabel: (label: string) => void;
}

const DashboardTabs: React.FC<DashboardTabsProps> = ({ activeLabel, setActiveLabel }) => {

    return (
        <div className="ua_top_item">
            <ul>
                {DashboardData.map((item, index) => {
                    const isActive = activeLabel === item.label;

                    return (
                        <li key={index}>
                            <a
                                href={`#${item.label.toLowerCase().replace(/\s+/g, '-')}`}
                                className={`text_gray font_weight_300 font_poppins line_height_20 heading_24 ${
                                    isActive ? 'active-tab' : ''
                                }`}
                                onClick={(e) => {
                                    e.preventDefault();
                                    setActiveLabel(item.label);
                                }}
                            >
                                <i className={`${item.icon} icon-style`} style={{ marginRight: '8px' }}></i>
                                {item.label}
                            </a>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default DashboardTabs;
