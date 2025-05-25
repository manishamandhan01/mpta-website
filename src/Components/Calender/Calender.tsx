// @flow
import * as React from 'react';
import {useEffect, useState} from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import TradeCalendar from "@Components/Calender/TradeCalendar.tsx";
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";


type Props = {};

export const Calendar = (props: Props) => {
    const [currentYear, setCurrentYear] = React.useState(new Date().getFullYear());
    const currentDate = new Date(); // Get the current date
    const currentDay = currentDate.getDate(); // Current day of the month
    const currentMonth = currentDate.getMonth(); // Current month (0-indexed)
    const currentYearGlobal = currentDate.getFullYear(); // Current year
    const {tradeRows, setTradeRows} = useGlobalStore();
    const [calendarTradeRows, setCalendarTradeRows] = useState([]);
    const { fetchTradeResults } = useTradeResults();
    const[activeLabel, setActiveLabel] = React.useState<string | null>("calendar");
    const [lastTradedYear, setLastTradedYear] = React.useState<number | null>(null);

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setCalendarTradeRows(json['calendar_trades']);
                setLastTradedYear(json['last_traded_year']);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        overAllPerformanceData();
    }, [tradeRows]);

    return (
        <div className="pb-5">
            <DashboardHeader/>
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
            <TradeCalendar trades={calendarTradeRows} lastTradedYear={lastTradedYear} />
        </div>
    );
};
