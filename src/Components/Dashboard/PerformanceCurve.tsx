import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useEffect } from "react";
import {useTradeResults, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";

type Props = {};

export const PerformanceCurve = (props: Props) => {
    const {tradeRows} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();
    const [equitygraph, setEquitygraph] = React.useState<number[]>([]);

    const PerformanceCurve = () => {
        fetchTradeResults()
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
        <div className="col-xl-10 col-lg-6 col-md-6 col-sm-12">
            <div className=" ">
                <div className="main_heading_card"><h1
                    className="font_poppins heading-20 line_height_32 font_weight_400 mt-5 ">Performance Curve</h1>
                </div>
                <div className="main_heading_card">
                    <hr/>

                </div>
                <div className="dashboard-overall-performance-card">
                    <div className="dashboard-card-gain-loss">
                        <HighchartsReact highcharts={Highcharts} options={performanceCurveGraph}/>
                    </div>
                </div>
            </div>
        </div>
    );
};
