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
    lastTradedYear: number | null;
}

const TradeCalendar: React.FC<TradeCalendarProps> = ({ trades, lastTradedYear }) => {
    const [currentYear, setCurrentYear] = useState(() => lastTradedYear ?? dayjs().year());

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
                <td key={`empty-${monthIndex}-${i}`} className="border  calender-cells p-1 align-top"   />
            );
        }

        for (let day = 1; day <= daysInMonth; day++) {
            const date = startOfMonth.date(day);
            const dateStr = date.format('YYYY-MM-DD');
            const trade = tradeMap[dateStr];

            const cellContent = trade ? (
                <div
                    className=" justify-between h-full w-full rounded p-1 overflow-hidden"
                    style={{
                        backgroundColor: trade.profit > 0 ? '#bbf7d0' : '#fecaca',
                    }}
                >
                    <div className="text-[12px] font-semibold">{day}</div>
                    <div className="d-flex  ">

                        <p className="heading-12 font-semibold truncate">{trade.symbol}</p>
                        <p className="heading-12 font-bold truncate ms-5">{trade.profit.toLocaleString()}</p>
                    </div>

                    <p className="heading-12 italic truncate font-bold ">{trade.trades} Trade(s)</p>
                </div>
            ) : (
                <div className="text-[12px] font-semibold">{day}</div>
            );

            currentWeek.push(
                <td
                    key={dateStr}
                    className="border  p-1 align-top calender-cells"
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
            <div key={monthIndex} className="bg-white rounded  card mt-5  ">
                <h3 className="font_poppins font_weight_400 heading-14 text_primary_300 mt-2 mb-2  text-center">{month.format('MMMM')}</h3>
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
            <div className="d-flex justify-content-center align-items-center mb-1 gap-2">
                <button
                    onClick={() => setCurrentYear((y) => y - 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    &lt; Prev Year
                </button>
                <h2 className="font_poppins heading_16 font_weight_400 text_light_gray">{currentYear}</h2>
                <button
                    onClick={() => setCurrentYear((y) => y + 1)}
                    className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                    Next Year &gt;
                </button>
            </div>




    {/* ✅ This is the layout that makes 3 months per row */
    }
    <div>


        <div className="calendar-grid row mt-0 mb-5">
            {Array.from({length: 12}).map((_, monthIndex) => renderMonth(monthIndex))}
        </div>
    </div>
</div>
)
    ;
};

export default TradeCalendar;
