import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {
    thisPeriod: number[];
    previousPeriod: number[];
    thisPeriodLabel: string;
    previousPeriodLabel: string;
    currencySymbol?: string;
};

const formatNumber = (value: number): string => {
    return value.toLocaleString(undefined, { minimumFractionDigits: 0 });
};

const calculateTotal = (arr: number[]): number =>
    arr.reduce((sum, val) => sum + (val ?? 0), 0);

const MonthlyEquityCurveChartWithSummary: React.FC<Props> = ({
                                                                 thisPeriod,
                                                                 previousPeriod,
                                                                 thisPeriodLabel,
                                                                 previousPeriodLabel,
                                                                 currencySymbol = 'Php',
                                                             }) => {
    const totalThis = calculateTotal(thisPeriod);
    const totalPrevious = calculateTotal(previousPeriod);
    const change = totalPrevious === 0 ? 0 : ((totalThis - totalPrevious) / totalPrevious) * 100;

    const categories = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    const options: Highcharts.Options = {
        title: { text: undefined },
        xAxis: {
            categories,
            tickmarkPlacement: 'on',
            title: { enabled: false },
        },
        yAxis: {
            title: { text: undefined },
            gridLineDashStyle: 'Dash',
        },
        tooltip: {
            shared: true,
            crosshairs: true,
            valueDecimals: 3,
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
            layout: 'horizontal',
        },
        series: [
            {
                name: 'Previous Period',
                type: 'line',
                data: previousPeriod,
                dashStyle: 'ShortDot',
                color: '#888',
                marker: { enabled: false },
            },
            {
                name: 'This Period',
                type: 'line',
                data: thisPeriod,
                color: '#1A2A52',
                marker: { enabled: true, symbol: 'circle' },
            },
        ],
        credits: { enabled: false },
        responsive: {
            rules: [
                {
                    condition: { maxWidth: 600 },
                    chartOptions: {
                        legend: { layout: 'horizontal', align: 'center', verticalAlign: 'bottom' },
                    },
                },
            ],
        },
    };

    return (
        <div className="p-4 rounded-xl bg-white shadow-md w-full max-w-full flex flex-row gap-4 items-center justify-between">
            {/* Chart */}
            <div className="flex-grow min-w-0">
                <HighchartsReact highcharts={Highcharts} options={options} />
            </div>

            {/* Summary Block */}
            <div className="w-[220px] border-l pl-4 flex flex-col items-start justify-center shrink-0">
                <div>
                    <div className="text-sm text-gray-600 font-medium">{thisPeriodLabel}</div>
                    <div className="text-xs text-gray-500 mb-4">vs. {previousPeriodLabel}</div>
                </div>
                <div className="w-full text-center">
                    <div className="text-xs text-gray-500 font-semibold mb-1">PROFIT</div>
                    <div className="text-lg font-bold text-gray-800">
                        {currencySymbol}
                        {formatNumber(totalThis)}
                    </div>
                    <div
                        className={`text-sm font-bold ${
                            change < 0 ? 'text-red-600' : 'text-green-600'
                        }`}
                    >
                        {change < 0 ? '▼' : '▲'} {Math.abs(change).toFixed(2)}%
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MonthlyEquityCurveChartWithSummary;
