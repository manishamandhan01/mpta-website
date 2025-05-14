// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";
import SettingsPanel from "@Components/Settings/NewSettings.tsx";

type Props = {

};
export const Settings = (props: Props) => {
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Settings");
    return (
        <div>
            <div className="pb-5">
                <DashboardHeader/>
            </div>
            <div>
                <div className="ua_top_item">
                    <ul>
                        {DashboardData.map((item, index: number) => {
                            const isActive = activeLabel === item.label;

                            return (
                                <li key={index}>
                                    <a
                                        href={item.label}
                                        className={`text_gray font_weight_300 font_poppins line_height_20 heading_24 ${
                                            isActive ? "active-tab" : ""
                                        }`}
                                        onClick={() => setActiveLabel(item.label)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="">


                <SettingsPanel />

            </div>
        </div>
    );
};

