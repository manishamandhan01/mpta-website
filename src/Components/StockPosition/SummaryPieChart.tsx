import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

interface SummaryPieChartProps {
    profitableCount: number;
    nonProfitableCount: number;
}

const SummaryPieChart: React.FC<SummaryPieChartProps> = ({ profitableCount, nonProfitableCount }) => {
    const total = profitableCount + nonProfitableCount;

    const options: Highcharts.Options = {
        chart: {
            type: 'pie',
            backgroundColor: 'transparent',
            height: 200,
        },
        title: {
            text: `<div style="text-align: center">
               <div style="font-size: 28px; font-weight: bold; color: #2c3e50">${total}</div>
               <div style="font-size: 14px; color: #7f8c8d">Traded<br/>Symbol</div>
             </div>`,
            useHTML: true,
            verticalAlign: 'middle',
            align: 'center',
            y: 10,
        },
        tooltip: {
            pointFormat: '<b>{point.y}</b>',
        },
        plotOptions: {
            pie: {
                dataLabels: {
                    enabled: true,
                    format: '{y}',
                    distance: -30,
                    style: {
                        fontSize: '12px',
                        color: 'black',
                    },
                },
                startAngle: 0,
                endAngle: 360,
                center: ['50%', '50%'],
                size: '100%',
                innerSize: '70%',
                borderWidth: 0
            },
        },
        series: [
            {
                type: 'pie',
                name: 'Symbols',
                data: [
                    {
                        name: 'Profitable',
                        y: profitableCount,
                        color: '#4CAF50',
                    },
                    {
                        name: 'Non-Profitable',
                        y: nonProfitableCount,
                        color: '#F44336',
                    },
                ],
            },
        ],
        credits: { enabled: false },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            itemStyle: {
                fontWeight: 'normal',
                fontSize: '14px',
            },
        },
    };

    return <HighchartsReact highcharts={Highcharts} options={options} />;
};

export default SummaryPieChart;
