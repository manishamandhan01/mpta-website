// components/MonthlyEquityCurveChart.tsx
import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface MonthlyEquityCurveChartProps {
    volumeData: number[];
    equityData: number[];
    categories: string[];
}

const MonthlyEquityCurveChart: React.FC<MonthlyEquityCurveChartProps> = ({
                                                                             volumeData,
                                                                             equityData,
                                                                             categories
                                                                         }) => {
    const options: Highcharts.Options = {
        chart: {
            zoomType: 'xy',
            backgroundColor: 'transparent',
            style: { fontFamily: 'sans-serif' }
        },
        title: { text: '' },
        xAxis: [{ categories, crosshair: true }],
        yAxis: [
            {
                title: { text: 'Volume' },
                labels: { format: '{value}', style: { color: '#90a4ae' } },
                opposite: false
            },
            {
                title: { text: 'Equity' },
                labels: { format: '{value}', style: { color: '#263238' } },
                opposite: true
            }
        ],
        tooltip: {
            shared: true
        },
        legend: {
            align: 'center',
            verticalAlign: 'top',
            floating: false,
            symbolRadius: 0
        },
        series: [
            {
                name: 'Volume',
                type: 'column',
                yAxis: 0,
                data: volumeData,
                color: '#cfd8dc',
                tooltip: { valuePrefix: '' }
            },
            {
                name: 'Equity',
                type: 'line',
                yAxis: 1,
                data: equityData,
                color: '#263238',
                tooltip: { valuePrefix: '' },
                marker: { enabled: false },
                dataLabels: {
                    enabled: true,
                    format: '{point.y:,.0f}',
                    style: { color: '#263238', textOutline: 'none' },
                    allowOverlap: true,
                    crop: false,
                    overflow: 'none'
                }
            }
        ],
        credits: { enabled: false }
    };

    return (
        <div className="rounded-xl shadow-sm bg-white p-4">
            <h3 className="text-lg font-semibold mb-2">Monthly Equity Curve</h3>
            <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
    );
};

export default MonthlyEquityCurveChart;
