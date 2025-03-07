import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from "react";

type Props = {};

export const PerformanceCurve = (props: Props) => {
    const [equitygraph, setEquitygraph] = React.useState<number[]>([]);

    const PerformanceCurve = () => {
        fetch('http://localhost:8000/dashboard/overall_performance/get_results?format=json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const overallPerformance = json['overall_performance'];
                setEquitygraph(overallPerformance['equity']);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        PerformanceCurve();
    }, []);

    const performanceCurveGraph = {
        chart: {
            type: 'line',
            height:'200'
        },
        title: {
            text: ''  // Title of the chart
        },
        subtitle: {
            text: 'Total time-weighted return'
        },
        xAxis: {
            categories: ['', '', '', '', '', '', '']  // Categories on the X-axis
        },
        yAxis: {
            title: {
                text: ''
            }
        },
        series: [{
            name: 'Performance',  // First series name
            data: [1, 2, 3, 4, 5, 6, 7]  // First line data points
        },
            {
                name: '',  // Second series name
                data: [3, 6, 1, 7, 2, 4, 9],  // Second line data points
                color: 'red' , // Set the line color to red
            }]
    }

    return (
        <div className="col-xl-6 col-md-6 col-sm-12">
            <div className="card-container box-12">
                <div><h1 className="linear-gradient-headings">Performance Curve</h1></div>
                <div className="dashboard-overall-performance-card">
                    <div className="dashboard-card">
                        <HighchartsReact highcharts={Highcharts} options={performanceCurveGraph}/>
                    </div>
                </div>
            </div>
            </div>
            );
            };
