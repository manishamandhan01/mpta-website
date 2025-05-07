// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import TradeCalendar from "@Components/Calender/TradeCalendar.tsx";
import {useState, useEffect} from "react";
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";


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

        // Empty days for the first week (if any)
        for (let i = 0; i < firstDayOfMonth; i++) {
            days.push(<div key={`empty-${i}`} className="empty-day" />);
        }

        // Fill the month with days
        for (let i = 1; i <= daysInMonth; i++) {
            const isToday = currentYear === currentYearGlobal && monthIndex === currentMonth && i === currentDay;
            days.push(
                <div
                    key={i}
                    className={`calendar-day ${isToday ? 'highlight-today' : ''}`}
                >
                    {i}
                </div>
            );
        }

        return (
            <div key={monthIndex} className="month-container">
                <h3 className="month-name">{monthNames[monthIndex]}</h3>
                <div className="calendar-grid">
                    {days}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div>
                <div className="ua_top_item">
                    <ul>
                        {DashboardData.map((item, index) => (
                            <li key={index}>
                                <i className={item.icon}></i>
                                <span>
                  <a className="nav-link text_gray font_weight_400 " aria-current="page" href={item.label}>
                    {item.label}
                  </a>
                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="calender-heading">
                Calendar
            </div>
            {/*<div className="yearly-calendar-container">*/}
                {/*<div className="year-header">*/}
                {/*    <button onClick={() => setCurrentYear(currentYear - 1)}>Prev Year</button>*/}
                {/*    <h2>{currentYear}</h2>*/}
                {/*    <button onClick={() => setCurrentYear(currentYear + 1)}>Next Year</button>*/}
                {/*</div>*/}
                {/*<div className="scrollable-calendar">*/}
                {/*    {monthNames.map((_, index) => renderMonth(index))}*/}
                {/*</div>*/}
                <div className="min-h-screen bg-gray-100">
                    <TradeCalendar trades={calendarTradeRows}/>
                </div>
            {/*</div>*/}
        </div>
    );
};
