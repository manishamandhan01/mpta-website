import * as React from 'react';
import { useEffect } from "react";
import {PerformancePeriod, QuarterlyPnl} from "@Components/Utils/Constants.tsx";
import {useTradeResults, useGlobalStore} from "@Components/DataGrid/GlobalState.tsx";




type ApiResponse = {
    performance_per_period: PerformancePeriod;
};

type Props = {};

export const PerformancePerRecord = (props: Props) => {
    const {tradeRows} = useGlobalStore();
    const { fetchTradeResults } = useTradeResults();
    const [quarterlyPnl, setQuarterlyPnl] = React.useState<QuarterlyPnl>({});
    const [thisMonthPnl, setThisMonthPnl] = React.useState(0);
    const [yearToDatePnl, setYearToDatePnl] = React.useState(-68);
    const [previousYearToDate, setPreviousYearToDate] = React.useState(0);
    const [lastTradedDate, setLastTradedDate] = React.useState("");

    // Fetch data from the backend and update the state
    const fetchPerformancePerRecord = () => {
        fetchTradeResults()
            .then((json: ApiResponse) => {
                const performance_per_period = json.performance_per_period;
                setQuarterlyPnl(performance_per_period.quarterly_pnl);
                setThisMonthPnl(performance_per_period.this_month_pnl);
                setYearToDatePnl(performance_per_period.year_to_date_pnl);
                setPreviousYearToDate(performance_per_period.previous_year_to_date_pnl);
                setLastTradedDate(performance_per_period.last_traded_date);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchPerformancePerRecord();
    }, [tradeRows]);

    // Function to round numbers to 2 decimal places


    return (
        <div className="">
            <div className=" ">


                <div className="dashboard-overall-performance-card ">
                    <div className="main_heading_card_inside"><h1
                        className="font_poppins heading-20 line_height_32 text-left font_weight_400 mt-2 ">Performance Per Period</h1></div>
                    <div className="main_heading_card_inside">
                        <hr/>

                    </div>

                    <div className="amounts">

                        <table className="table mt-5" style={{borderCollapse: 'collapse'}}>
                            <thead>
                            <tr>


                            </tr>
                            </thead>
                            <tbody>
                            <tr className="background_grey_color">
                                <td>This Month</td>
                                <td className={(thisMonthPnl) >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                                <td className={(thisMonthPnl) >= 0 ? 'total_gain_row' : 'total_loss_row'}>{((thisMonthPnl === null) ? '-' : thisMonthPnl)}</td>
                                {/*<td className={(thisMonthPnl) >= 0 ? 'total_gain_row' : 'total_loss_row'}><i*/}
                                {/*    className={(thisMonthPnl) >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>*/}
                                {/*</td>*/}
                                {/*<td className={(thisMonthPnl) >= 0 ? 'total_gain_row' : 'total_loss_row'}>%</td>*/}
                            </tr>
                            <tr>
                                <td>1st Quater</td>
                                <td className={(quarterlyPnl['1']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                                <td className={(quarterlyPnl['1']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>{quarterlyPnl['1']}</td>
                                {/*<td className={(quarterlyPnl['1']) >= 0 ? 'total_gain_row' : 'total_loss_row'}><i*/}
                                {/*    className={(quarterlyPnl['1'] + quarterlyPnl['2018 Q3'] + quarterlyPnl['2019 Q3']) >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>*/}
                                {/*</td>*/}
                                {/*<td className={(quarterlyPnl['2018 Q1']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>%</td>*/}
                            </tr>
                            <tr className="background_grey_color">
                                <td>2nd Quater</td>
                                <td className={(quarterlyPnl['2']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                                <td className={(quarterlyPnl['2']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>{quarterlyPnl['2']}</td>
                                {/*<td className={(quarterlyPnl['2018 Q2']) >= 0 ? 'total_gain_row' : 'total_loss_row'}><i*/}
                                {/*    className={(quarterlyPnl['2018 Q2']) >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>*/}
                                {/*</td>*/}
                                {/*<td className={(quarterlyPnl['2018 Q2']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>%</td>*/}
                            </tr>
                            <tr>
                                <td>3rd Quater</td>
                                <td className={(quarterlyPnl['3']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                                <td className={(quarterlyPnl['3']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>{quarterlyPnl['3']}</td>
                                {/*<td className={(quarterlyPnl['2017 Q3']) >= 0 ? 'total_gain_row' : 'total_loss_row'}><i*/}
                                {/*    className={(quarterlyPnl['2017 Q3']) >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>*/}
                                {/*</td>*/}
                                {/*<td className={(quarterlyPnl['2017 Q3']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>%</td>*/}
                            </tr>
                            <tr className="background_grey_color">
                                <td>4th Quater</td>
                                <td className={(quarterlyPnl['4']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                                <td className={(quarterlyPnl['4']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>{quarterlyPnl['4']}</td>
                                {/*<td className={(quarterlyPnl['2017 Q4']) >= 0 ? 'total_gain_row' : 'total_loss_row'}><i*/}
                                {/*    className={(quarterlyPnl['2017 Q4']) >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>*/}
                                {/*</td>*/}
                                {/*<td className={(quarterlyPnl['2017 Q4']) >= 0 ? 'total_gain_row' : 'total_loss_row'}>%</td>*/}
                            </tr>
                            <tr>
                                <td>Year To Date</td>
                                <td className={(yearToDatePnl) >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                                <td className={(yearToDatePnl) >= 0 ? 'total_gain_row' : 'total_loss_row'}>{(yearToDatePnl)}</td>
                                {/*<td className={(yearToDatePnl) >= 0 ? 'total_gain_row' : 'total_loss_row'}><i*/}
                                {/*    className={(yearToDatePnl) >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>*/}
                                {/*</td>*/}
                                {/*<td className={(yearToDatePnl) >= 0 ? 'total_gain_row' : 'total_loss_row'}>%</td>*/}
                            </tr>
                            <tr className="background_grey_color">
                                <td>Previous YTD</td>
                                <td className={(previousYearToDate) >= 0 ? 'total_gain_row' : 'total_loss_row'}>$</td>
                                <td className={(previousYearToDate) >= 0 ? 'total_gain_row' : 'total_loss_row'}>{(previousYearToDate)}</td>
                                {/*<td className={(previousYearToDate) >= 0 ? 'total_gain_row' : 'total_loss_row'}><i*/}
                                {/*    className={(previousYearToDate) >= 0 ? 'fa-solid fa-caret-up' : 'fa-solid fa-caret-down'}></i>*/}
                                {/*</td>*/}
                                {/*<td className={(previousYearToDate) >= 0 ? 'total_gain_row' : 'total_loss_row'}>%</td>*/}
                            </tr>

                            </tbody>
                        </table>
                        <div>
                            Last Traded Date: {lastTradedDate}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};
