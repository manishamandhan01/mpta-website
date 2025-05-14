// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import TradeCalendar from "@Components/Calender/TradeCalendar.tsx";
import {useState, useEffect} from "react";
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

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setCalendarTradeRows(json['calendar_trades']);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        overAllPerformanceData();
    }, [tradeRows]);


    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    const renderMonth = (monthIndex) => {
        const daysInMonth = new Date(currentYear, monthIndex + 1, 0).getDate();
        const firstDayOfMonth = new Date(currentYear, monthIndex, 1).getDay();
        const days = [];

        const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

        // Weekday headers
        const weekdayHeaders = weekdays.map((day, index) => (
            <div key={`weekday-${index}`} className="calendar-weekday font-semibold text-center text-gray-600">
                {day}
            </div>
        ));

        // Empty days for the first week
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day" />);
        }

        // Fill in the actual days
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = currentYear === currentYearGlobal && monthIndex === currentMonth && i === currentDay;
            days.push(
                <div
                    key={i}
                    className={`calendar-day text-center ${isToday ? 'highlight-today bg-blue-200 rounded' : ''}`}
                >
                    {i}
                </div>
            );
        }

        return (
            <div key={monthIndex} className="dashboard-overall-performance-card p-2">
                <h3 className="month-name font-bold mb-2">{monthNames[monthIndex]}</h3>
                <div className="calendar-grid grid grid-cols-7 gap-1 text-sm">
                    {weekdayHeaders}
                    {days}
                </div>
            </div>
        );
    };


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
            <TradeCalendar trades={calendarTradeRows} />
            {/*</div>*/}
        </div>
    );
};
