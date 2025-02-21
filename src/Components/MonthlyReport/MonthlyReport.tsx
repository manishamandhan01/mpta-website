// @flow 
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";

type Props = {
    
};
export const MonthlyReport = (props: Props) => {
    const [realizedProfit, setTotalGainPer] = React.useState<number>(7892);
    const [realizedLoss, setTotalLossPer] = React.useState<number>(794);
    const total = realizedProfit + realizedLoss;
    const profitPercentage = total ? (realizedProfit / total) * 100 : 0; // percentage of realized profit
    const lossPercentage = total ? (realizedLoss / total) * 100 : 0; //
   const monthlyChartOne= {
       chart: {
           width: 1200 ,
           height: 300 ,
       },
       title: {
           text: null
       },

       accessibility: {
           point: {
               valueDescriptionFormat:
                   '{xDescription}{separator}{value} million(s)'
           }
       },

       xAxis: {
           title: {
               text: 'Year'
           },
           categories: [1995, 2000, 2005, 2010, 2015, 2020, 2023]
       },

       yAxis: {
           type: 'logarithmic',
           title: {
               text: null
           }
       },

       tooltip: {
           headerFormat: '<b>{series.name}</b><br />',
           pointFormat: '{point.y} million(s)'
       },

       series: [{
           name: 'Internet Users',
           keys: ['y', 'color'],
           data: [
               [16, '#0000ff'],
               [361, '#8d0073'],
               [1018, '#ba0046'],
               [2025, '#d60028'],
               [3192, '#eb0014'],
               [4673, '#fb0004'],
               [5200, '#ff0000']
           ],
           color: {
               linearGradient: {
                   x1: 0,
                   x2: 0,
                   y1: 1,
                   y2: 0
               },
               stops: [
                   [0, '#0000ff'],
                   [1, '#ff0000']
               ]
           }
       }]
    };
    const monthlyChartTwo= {
        chart: {
            width: 600 ,
            height: 300 ,
        },
        title: {
            text: null
        },

        accessibility: {
            point: {
                valueDescriptionFormat:
                    '{xDescription}{separator}{value} million(s)'
            }
        },

        xAxis: {
            title: {
                text: 'Year'
            },
            categories: [1995, 2000, 2005, 2010, 2015, 2020, 2023]
        },

        yAxis: {
            type: 'logarithmic',
            title: {
                text: null
            }
        },

        tooltip: {
            headerFormat: '<b>{series.name}</b><br />',
            pointFormat: '{point.y} million(s)'
        },

        series: [{
            name: 'Internet Users',
            keys: ['y', 'color'],
            data: [
                [16, '#0000ff'],
                [361, '#8d0073'],
                [1018, '#ba0046'],
                [2025, '#d60028'],
                [3192, '#eb0014'],
                [4673, '#fb0004'],
                [5200, '#ff0000']
            ],
            color: {
                linearGradient: {
                    x1: 0,
                    x2: 0,
                    y1: 1,
                    y2: 0
                },
                stops: [
                    [0, '#0000ff'],
                    [1, '#ff0000']
                ]
            }
        }]
    };

    return (
        <div className="pb-5" >
            {/*heading*/}
            <div>
                <div className="ua_top_item">
                    <ul>
                        {DashboardData.map((item, index: number) => {
                            return (
                                <li key={index}>
                                    <i className={item.icon}></i>
                                    <span> <a className="nav-link text_gray font_weight_400 " aria-current="page"
                                              href={item.label}>{item.label}</a></span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="">
                <div className="d-flex align-items-center ms-4 p-3">
                    <div className="bank-icon ">
                        <i className="fa-solid fa-arrow-trend-up"></i>
                    </div>
                    <p className="ps-2">Monthly Report</p>
                </div>

                <div className="row col-12 m-auto mt-2">
                    {/*CardOne*/}

                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative">
                            <div className="dashboard-overall-performance-card">
                                <p>MONTHLY EQUITY CURVE</p>
                                <div className="amounts mt-3    ">

                                    <div>
                                        <HighchartsReact highcharts={Highcharts} options={monthlyChartOne}/>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    {/*card2*/}
                    <div className="col-xl-6 col-lg-12 col-md-6 col-sm-12">
                        <div className="portfolio-card-container box-12 position-relative overflow-x-auto">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-3 d-flex flex-row    ">

                                    <div>
                                        <HighchartsReact highcharts={Highcharts} options={monthlyChartTwo}/>
                                    </div>
                                    <div className="ms-5 text-center">
                                        <p>Jan-19 to Dec-19</p>
                                        <p>Vs Jan-19 to Dec-19</p>
                                        <button>Profit</button>
                                        <div className=" ms-5 me-5 d-flex flex-row align-items-center ">
                                            <button className="circle-btn bg-light "><i
                                                className="fa-solid fa-arrow-up icon-black icon-large-20"></i>
                                            </button>
                                            <button className="circle-btn bg-light "><i
                                                className="fa-solid fa-arrow-down icon-black icon-large-20"></i>
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>


                </div>

            </div>
        </div>
    );
};

