import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {};

interface TableRowData {
    label: string;
    value: number;
    dollarValue: number;
}

export const EmotionTableWithChart: React.FC<Props> = (props: Props) => {
    const tableData: TableRowData[] = [
        {label: "Fear", value: -2, dollarValue: 243735},
        {label: "Greed", value: -2, dollarValue: 83235},
        {label: "Fomo", value: -2, dollarValue: 32735},
        {label: "Bored", value: -8, dollarValue: 25735},
        {label: "Hope", value: 6, dollarValue: 272135},
        {label: "Confident", value: 19, dollarValue: 458935},
    ];

    // Prepare chart data dynamically based on tableData
    const chartOptions = {
        chart: {
            type: 'bar',
            height: 275, // Adjust height as needed
        },
        title: {
            text: null,
            style: {
                fontSize: '16px',
            },

        },
        subtitle: {
            text: null,
        },
        xAxis: {
            categories: tableData.map(row => row.label), // Use 'label' as x-axis categories
            labels: {
                enabled: false, // Disable x-axis labels
            },
            title: {
                text: null, // No title for x-axis
            },
        },
        yAxis: {
            labels: {
                enabled: false, // Disable y-axis labels
            },
            title: {
                text: null, // No title for y-axis
            },
            min: 0, // Ensure bars start from 0

        },
        legend: {
            enabled: false, // Hide the legend (Series 1)
        },
        series: [
            {
                data: tableData.map(row => row.dollarValue), // Use dollarValue for bar height
                color: '#', // Set color for the bars
            },
        ],
    };


    return (
        <div className="row mt-4">
            <div className="col-7 ">

                <table className="table mt-2" style={{borderCollapse: 'collapse'}}>
                    <thead className="position-absolute top-10" >
                    <tr>
                        <th className="heading-20 font_Epilogue font_weight_400 mb-4 ">Emotion</th>
                        <th className="heading-20 font_Epilogue font_weight_400 mb-4 ">Score</th>
                        <th className="heading-20 font_Epilogue font_weight_400 mb-4 ">Profit/Loss</th>
                    </tr>
                    </thead>
                    <tbody>
                    {tableData.map((row, index) => (
                        <tr key={index} className="table-row-padding" >
                            <td>{row.label}</td>
                            <td>{row.value}</td>
                            <td>{`$${row.dollarValue.toLocaleString()}`}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>

            </div>
            <div className="col-5 ">
                {/* Render the Highcharts bar chart */}
                <HighchartsReact highcharts={Highcharts} options={chartOptions}/>

            </div>
        </div>
    );
};
