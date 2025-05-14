import React, { useState } from 'react';
import dayjs from 'dayjs';

interface Trade {
    date: string;
    profit: number;
    trades: number;
    symbol: string;
}

interface TradeCalendarProps {
    trades: Trade[];
}

const TradeCalendar: React.FC<TradeCalendarProps> = ({ trades }) => {
    const [currentYear, setCurrentYear] = useState(dayjs().year());

    const tradeMap = trades.reduce((acc, trade) => {
        const key = dayjs(trade.date).format('YYYY-MM-DD');
        acc[key] = trade;
        return acc;
    }, {} as Record<string, Trade>);

    const renderMonth = (monthIndex: number) => {
        const month = dayjs().year(currentYear).month(monthIndex);
        const startOfMonth = month.startOf('month');
        const startDay = startOfMonth.day();
        const daysInMonth = startOfMonth.daysInMonth();

        const weeks: JSX.Element[][] = [];
        let currentWeek: JSX.Element[] = [];

        for (let i = 0; i < startDay; i++) {
            currentWeek.push(
                <td key={`empty-${monthIndex}-${i}`} className="border w-[14.28%] h-[80px] p-1 align-top" />
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = startOfMonth.date(day);
            const dateStr = date.format('YYYY-MM-DD');
            const trade = tradeMap[dateStr];

            const cellContent = trade ? (
                <div
                    className="flex flex-col justify-between h-full w-full rounded p-1 overflow-hidden"
                    style={{
                        backgroundColor: trade.profit > 0 ? '#bbf7d0' : '#fecaca',
                    }}
                >
                    <div className="text-[10px] font-semibold truncate">{trade.symbol}</div>
                    <div className="text-[12px] font-bold truncate">{trade.profit.toLocaleString()}</div>
                    <div className="text-[10px] italic truncate">{trade.trades} Trade(s)</div>
                </div>
            ) : (
                <div className="text-[12px] font-semibold">{day}</div>
            );

            currentWeek.push(
                <td
                    key={dateStr}
                    className="border w-[14.28%] h-[80px] p-1 align-top"
                >
                    {cellContent}
                </td>
            );

            if (date.day() === 6 || day === daysInMonth) {
                weeks.push(currentWeek);
                currentWeek = [];
            }
        }

        return (
            <div key={monthIndex} className="bg-white rounded p-2 shadow">
                <h3 className="font-bold mb-2 text-sm text-center">{month.format('MMMM')}</h3>
                <table className="w-full table-fixed border-collapse text-xs border border-gray-300">
                    <thead>
                    <tr>
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d) => (
                            <th key={d} className="border bg-gray-100 text-[10px] text-center">{d}</th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {weeks.map((week, i) => (
                        <tr key={i}>{week}</tr>
                    ))}
                    </tbody>
                </table>
            </div>
        );
    };

    return (
        <div className="w-full max-w-7xl mx-auto p-4">
            <div className="flex justify-between items-center mb-6">
                <button
                    onClick={() => setCurrentYear((y) => y - 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    &lt; Prev Year
                </button>
                <h2 className="text-2xl font-bold">{currentYear}</h2>
                <button
                    onClick={() => setCurrentYear((y) => y + 1)}
                    className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Next Year &gt;
                </button>
            </div>

            {/* ✅ This is the layout that makes 3 months per row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 12 }).map((_, monthIndex) => renderMonth(monthIndex))}
            </div>
        </div>
    );
};

export default TradeCalendar;
