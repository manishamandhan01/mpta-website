// @flow
import * as React from 'react';
import {DashboardData} from "@Components/Dashboard/DashboardData.tsx";
import {OverAllPerformanceCard} from "@Components/Dashboard/OverAllPerformanceCard.tsx";
import {DistributionGainLossBar} from "@Components/Dashboard/DistributionGainLossBar.tsx";
import {OverAllTradeStatisticsCard} from "@Components/Dashboard/OverAllTradeStatisticsCard.tsx";
import HighchartsReact from "highcharts-react-official";
import Highcharts from "highcharts";
import TradeDataGrid from "@Components/DataGrid/DataGrid.tsx";
import {useEffect, useState} from "react";
import {useTradeResults, TradeRow, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";
import DashboardHeader from "@Components/Dashboard/DashboardHeader.tsx";

type Props = {

};
export const TradeLog = (props: Props) => {

    const {tradeRows} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();


    const [topStockPositionsByAllocation, setTopStockPositionsByAllocation] = useState([]);
    const [capitalCalculations, setCapitalCalculations] = useState([]);
    const[activeLabel, setActiveLabel] = React.useState<string | null>("Trade Log");

    // Fetching data
    const overAllPerformanceData = () => {
        fetchTradeResults()
            .then(json => {
                setTopStockPositionsByAllocation(json['top_5_stock_positions_by_allocation']);
                setCapitalCalculations(json['capital_calculations']);
            })
            .catch(err => console.log(err));
    };

    useEffect(() => {
        overAllPerformanceData();
    }, [tradeRows]);

    const handleTradeRowsChange = (rows: TradeRow[]) => {
        console.log("Updated trade rows from TradeDataGrid", rows);
        // setTradeRows(rows);
    };
    // Data retrieved from https://netmarketshare.com/
    // Make monochrome colors
    const colors = Highcharts.getOptions().colors.map((c, i) =>
        // Start out with a darkened base color (negative brighten), and end
        // up with a much brighter color
        Highcharts.color(Highcharts.getOptions().colors[0])
            .brighten((i - 3) / 7)
            .get()
    );

    const tradeLogChart = {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie',
            width: 400,  // Decrease the width of the chart
            height: 300  //
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
        },
        accessibility: {
            point: {
                valueSuffix: '%'
            }
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                cursor: 'pointer',
                borderRadius: 5,
                dataLabels: {
                    enabled: true,
                    format: '<b>{point.name}</b><br>{point.percentage:.1f} %',
                    distance: -50,
                    filter: {
                        property: 'percentage',
                        operator: '>',
                        value: 4
                    }
                }
            }
        },
        series: [{
            name: 'Share',
            data: [
                { name: 'Allocation', y: 74 },
                { name: 'Cash', y: 12 },
            ]
        }]
    };
    return (
        <div className="pb-5">
            <div className=" ">
                <DashboardHeader/>

            </div>
            <div>
                <div className="ua_top_item">
                    <ul>
                        {DashboardData.map((item, index: number) => {
                            const isActive = activeLabel === item.label;

                            return (
                                <li key={index}>
                                    <a
                                        href={item.label}
                                        className={`text_gray font_weight_300 font_poppins line_height_20 heading_24 ${
                                            isActive ? "active-tab" : ""
                                        }`}
                                        onClick={() => setActiveLabel(item.label)}
                                    >
                                        {item.label}
                                    </a>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>
            <div className="">


                <div className="row col-12  main-trade-log-cards m-auto mt-5 ">
                    {/*CardOne*/}

                    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 ">
                        <div className=" box-12 ms-0  position-relative">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2" style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue heading-16 font_weight_400 line_height_32"
                                                colSpan={3}>Account
                                                Name
                                            </th>
                                            <th className="font_Epilogue heading-16 font_weight_400 line_height_32">Sam</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {capitalCalculations.map((row, index) => (
                                            <tr
                                                key={index}
                                                className={index % 2 === 0 ? "background_grey_color" : ""}
                                            >
                                                <td>{row["label"]}</td>
                                                <td>{row["currency"]}</td>
                                                <td>{row["amount"]}</td>
                                                <td>{row["percentage"]}</td>
                                            </tr>
                                        ))}
                                        </tbody>

                                    </table>


                                </div>
                            </div>
                        </div>
                    </div>

                    {/*card2*/}
                    <div className="col-xl-4 col-lg-6 col-md-8 col-sm-12">
                        <div className="   position-relative ms-0    box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue heading-16 font_weight_400 line_height_32"
                                                style={{fontSize: '15px'}}>Top Five Stock
                                                Position By Allocation
                                            </th>

                                        </tr>
                                        </thead>
                                        <thead>
                                        <tr>
                                            <th className="font_Epilogue  font_weight_500"
                                                style={{fontSize: '15px'}}>Weight%
                                            </th>
                                            <th className="font_Epilogue font_weight_500 "
                                                style={{fontSize: '15px'}}>Stock Code
                                            </th>
                                            <th className="font_Epilogue font_weight_500"
                                                style={{fontSize: '15px'}}>Ave.Price
                                            </th>
                                            <th className="font_Epilogue font_weight_500"
                                                style={{fontSize: '15px'}}>Total Shares
                                            </th>
                                            <th className="font_Epilogue font_weight_500"
                                                style={{fontSize: '15px'}}>Amount
                                            </th>

                                        </tr>

                                        </thead>


                                        <tbody>
                                        {topStockPositionsByAllocation?.length > 0 ? (
                                            topStockPositionsByAllocation.map((stock, index) => (
                                                <tr
                                                    key={index}
                                                    className={`${index % 2 === 0 ? 'background_grey_color' : ''}`}
                                                    style={{
                                                        paddingTop: '5px',
                                                        paddingBottom: '5px',
                                                    }} // Add height or padding
                                                >
                                                    <td className="py-1">{stock['weight_percentage'] ?? 'N/A'}</td>
                                                    <td className="py-1">{stock['symbol'] ?? 'N/A'}</td>
                                                    <td className="py-1">{stock['average_price'] ?? 'N/A'}</td>
                                                    <td className="py-1">{stock['total_shares'] ?? 'N/A'}</td>
                                                    <td className="py-1">{stock['amount'] ?? 'N/A'}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="text-center py-3">Loading or No Data</td>
                                            </tr>
                                        )}
                                        </tbody>

                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*card3*/}

                    <div className="col-xl-2 col-lg-6 col-md-5 col-sm-12">
                        <div className="   position-relative  ms-0  box-12">
                            <div className="dashboard-overall-performance-card">
                                <div className="amounts mt-5">
                                    <table className="table mt-2 " style={{borderCollapse: 'collapse'}}>
                                        <thead className="position-absolute top-10">
                                        <tr>
                                            <th className="font_Epilogue heading-16 font_weight_400 line_height_32"
                                                style={{fontSize: '15px'}}>SL & TP
                                                Calculator
                                            </th>
                                            <th>
                                                <svg width="30" height="30" viewBox="0 0 20 20" fill="none"
                                                     xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        d="M16.3249 12.9167L14.8082 11.8333C15.0582 10.9333 15.0749 9.95833 14.8082 8.98333L16.3249 7.91667L15.1166 5.83333L13.4249 6.6C12.7666 5.93333 11.9332 5.41667 10.9582 5.175L10.7916 3.33333H8.3749L8.20824 5.175C7.23324 5.41667 6.3999 5.93333 5.74157 6.6L4.0499 5.83333L2.84157 7.91667L4.35824 8.98333C4.09157 9.95833 4.10824 10.9333 4.35824 11.8333L2.84157 12.9167L4.0499 15L5.74157 14.225C6.3999 14.8833 7.23324 15.3833 8.20824 15.6417L8.3749 17.5H10.7916L10.9582 15.6417C11.9332 15.3833 12.7666 14.8833 13.4249 14.225L15.1166 15L16.3249 12.9167ZM11.2499 2.5C11.4749 2.5 11.6666 2.66667 11.6666 2.88333L11.8166 4.58333C12.4499 4.81667 13.0166 5.15833 13.5249 5.56667L15.0666 4.84167C15.2582 4.74167 15.4999 4.80833 15.6166 5L17.2832 7.91667C17.3999 8.09167 17.3332 8.33333 17.1499 8.45833L15.7582 9.43333C15.8666 10.1 15.8582 10.7583 15.7582 11.4L17.1499 12.375C17.3332 12.5 17.3999 12.7417 17.2832 12.9167L15.6166 15.8333C15.4999 16.0083 15.2582 16.075 15.0666 15.975L13.5249 15.2583C13.0166 15.6667 12.4499 16 11.8166 16.25L11.6666 17.9167C11.6666 18.1583 11.4749 18.3333 11.2499 18.3333H7.91657C7.80606 18.3333 7.70008 18.2894 7.62194 18.2113C7.5438 18.1332 7.4999 18.0272 7.4999 17.9167L7.3499 16.25C6.71657 16 6.1499 15.6667 5.64157 15.2583L4.0999 15.975C3.90824 16.075 3.66657 16.0083 3.5499 15.8333L1.88324 12.9167C1.76657 12.7417 1.83324 12.5 2.01657 12.375L3.40824 11.4C3.30824 10.7583 3.2999 10.1 3.40824 9.43333L2.01657 8.45833C1.83324 8.33333 1.76657 8.09167 1.88324 7.91667L3.5499 5C3.66657 4.80833 3.90824 4.74167 4.0999 4.84167L5.64157 5.56667C6.1499 5.15833 6.71657 4.81667 7.3499 4.58333L7.4999 2.88333C7.4999 2.66667 7.69157 2.5 7.91657 2.5H11.2499ZM9.58324 7.5C10.3568 7.5 11.0986 7.80729 11.6456 8.35427C12.1926 8.90125 12.4999 9.64312 12.4999 10.4167C12.4999 11.1902 12.1926 11.9321 11.6456 12.4791C11.0986 13.026 10.3568 13.3333 9.58324 13.3333C8.80969 13.3333 8.06782 13.026 7.52084 12.4791C6.97386 11.9321 6.66657 11.1902 6.66657 10.4167C6.66657 9.64312 6.97386 8.90125 7.52084 8.35427C8.06782 7.80729 8.80969 7.5 9.58324 7.5ZM9.58324 8.33333C9.0307 8.33333 8.5008 8.55283 8.1101 8.94353C7.7194 9.33423 7.4999 9.86413 7.4999 10.4167C7.4999 10.9692 7.7194 11.4991 8.1101 11.8898C8.5008 12.2805 9.0307 12.5 9.58324 12.5C10.1358 12.5 10.6657 12.2805 11.0564 11.8898C11.4471 11.4991 11.6666 10.9692 11.6666 10.4167C11.6666 9.86413 11.4471 9.33423 11.0564 8.94353C10.6657 8.55283 10.1358 8.33333 9.58324 8.33333Z"
                                                        fill="black"/>
                                                </svg>
                                            </th>

                                        </tr>
                                        </thead>
                                        <thead>
                                        <tr>
                                            <th className="font_Epilogue text-center font_weight_500"
                                                style={{fontSize: '15px'}}>Stop
                                                Loss
                                            </th>
                                            <th className="font_Epilogue text-center font_weight_500 "
                                                style={{fontSize: '15px'}}>Target
                                                Price
                                            </th>

                                        </tr>

                                        </thead>


                                        <tbody>
                                        <tr className="background_grey_color">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>
                                        <tr className="">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>
                                        <tr className="">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>
                                        <tr className="background_grey_color">
                                            <td className="total_loss_row text-center">43.30</td>
                                            <td className="total_gain_row text-center">51.426</td>
                                        </tr>

                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    {/*Card4*/}
                    <div className="col-xl-3  col-lg-6 col-md-5 col-sm-12">
                        <div className=" position-relative ms-0 box-12 overflow-x-auto">
                            <div className="dashboard-overall-performance-card">
                                <div className="font_Epilogue heading-16 font_weight_400 line_height_32">
                                   Portfolio
                                </div>
                                <div className="amounts d-flex  align-items-center">
                                    <div id="overAllPerformanceChart" className="d-flex align-items-center">
                                        <HighchartsReact highcharts={Highcharts} options={tradeLogChart}/>
                                        <div className="">
                                            <button className="circle-btn bg-light m-0 "><i
                                                className="fa-solid fa-arrow-up icon-black icon-large-20"></i>
                                            </button>
                                            <button className="circle-btn bg-light mt-3 m-0"><i
                                                className="fa-solid fa-arrow-down icon-black icon-large-20"></i>
                                            </button>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="amounts mt-4  d-flex flex-row">
                        <TradeDataGrid onRowsChange={handleTradeRowsChange}/>
                    </div>
                </div>


            </div>
        </div>
    );
};

