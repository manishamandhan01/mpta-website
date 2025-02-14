import * as React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

type Props = {};

export const PerformanceCurve = (props: Props) => {
    const chartOptions = {
        chart: {
            type: 'spline',
        },
        title: {
            text: '',
        },
        subtitle: {
            text: 'Total-Time-Weighted-Return:',
        },
        // Hardcoded CSV data (for demo purposes)
        data: {
            csv: `
                Year,Inflation,Claims on central government, Net foreign assets, Net domestic credit
                2000,2.2,4500,10000,12000
                2001,1.5,4700,10500,12500
                2002,1.8,4900,11000,13000
                2003,2.0,5100,11500,13500
                2004,2.5,5300,12000,14000
                2005,3.0,5500,12500,14500
                2006,2.8,5700,13000,15000
                2007,3.2,5900,13500,15500
                2008,4.5,6100,14000,16000
            `
        },
        yAxis: [{
            title: {
                text: 'Inflation',
            },
            plotLines: [{
                color: 'black',
                width: 2,
                value: 13.5492019749684,
                animation: {
                    duration: 1000,
                    defer: 4000,
                },
                label: {
                    text: 'Max Inflation',
                    align: 'right',
                    x: -20,
                },
            }],
        }, {
            title: {
                text: 'Claims on central government, etc.',
            },
        }, {
            opposite: true,
            title: {
                text: '',
            },
        }, {
            opposite: true,
            title: {
                text: '',
            },
        }],
        plotOptions: {
            series: {
                animation: {
                    duration: 1000,
                },
                marker: {
                    enabled: false,
                },
                lineWidth: 2,
            },
        },
        series: [{
            yAxis: 0,
        }, {
            yAxis: 1,
            animation: {
                defer: 1000,
            },
        }, {
            yAxis: 2,
            animation: {
                defer: 2000,
            },
        }, {
            yAxis: 3,
            animation: {
                defer: 3000,
            },
        }],
        responsive: {
            rules: [{
                condition: {
                    maxWidth: 500,
                },
                chartOptions: {
                    yAxis: [{
                        tickAmount: 2,
                        title: {
                            x: 15,
                            reserveSpace: false,
                        },
                    }, {
                        tickAmount: 2,
                        title: {
                            x: 20,
                            reserveSpace: false,
                        },
                    }, {
                        tickAmount: 2,
                        title: {
                            x: -20,
                            reserveSpace: false,
                        },
                    }, {
                        tickAmount: 2,
                        title: {
                            x: -20,
                            reserveSpace: false,
                        },
                    }],
                },
            }],
        },
    };

    return (
        <div className="col-xl-6 col-md-6 col-sm-12">
            <div className="card-container box-12">
                <div><h1 className="linear-gradient-headings">Performance Curve</h1></div>

                <div className="dashboard-overall-performance-card">
                   
                </div>
            </div>
        </div>
    );
};
