// @flow 
import * as React from 'react';
import {useEffect} from "react";

type Props = {
    
};
export const PerformancePerRecord = (props: Props) => {
    const [quaterlyPnl, setQuaterlyPnl] = React.useState(0);
    const [thisMonthPnl, setThisMonthPnl] = React.useState(0);
    const [yearToDatePnl, setYearToDatePnl] = React.useState(0);
    const [previousYearToDate, setPreviousYearToDate] = React.useState(0);

    const PerformancePerRecord = () => {
        fetch('http://localhost:8000/dashboard/overall_performance/get_results?format=json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json) => {
                const performance_per_period = json['performance_per_period'];
                setThisMonthPnl(performance_per_period['this_month_pnl']);
                setQuaterlyPnl(performance_per_period['quarterly_pnl']);
                setYearToDatePnl(performance_per_period['year_to_date_pnl']);
                setPreviousYearToDate(performance_per_period['previous_year_to_date_pnl']);


            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        PerformancePerRecord();
    }, []);

    return (
        <div>
            <div className="card-container">
                <div className="dashboard-overall-performance-card">
                    <h1 style={{fontSize: '30px', fontWeight: 'normal'}}>Performance Per Period</h1>
                    <div className="amounts">
                        <div className="d-flex justify-content-between text-center">
                            <div className="lh-lg">
                                <div><p className="text-success font-bold">This Month</p></div>
                                <div><p>1st Quater</p></div>
                                <div><p >2nd Quater</p></div>
                                <div><p>3rd Quater</p></div>
                                <div><p>4th Quater</p></div>
                                <div><p>Year to Date</p></div>
                                <div><p>Prevoius YTD</p></div>

                            </div>

                            <div className="lh-lg">
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>


                            </div>

                            <div className="lh-lg">
                                <div><p className=" font-bold">{thisMonthPnl}</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">$</p></div>
                                <div><p className=" font-bold">{yearToDatePnl}</p></div>
                                <div><p className=" font-bold">{previousYearToDate}</p></div>

                            </div>
                            <div className="lh-lg">
                                <div><p className=" font-bold"></p></div>
                                <div><p className=" font-bold"><i className= 'fa-solid fa-caret-up'></i></p></div>
                                <div><p className=" font-bold"><i className= 'fa-solid fa-caret-up'></i></p></div>
                                <div><p className=" font-bold"><i className= 'fa-solid fa-caret-up'></i></p></div>
                                <div><p className=" font-bold"><i className= 'fa-solid fa-caret-up'></i></p></div>
                                <div><p className=" font-bold"><i className= 'fa-solid fa-caret-up'></i></p></div>
                                <div><p className=" font-bold"><i className= 'fa-solid fa-caret-up'></i></p></div>

                            </div>
                            <div className="lh-lg">
                                <div><p className=" font-bold"></p></div>
                                <div><p className=" font-bold">%</p></div>
                                <div><p className=" font-bold">%</p></div>
                                <div><p className=" font-bold">%</p></div>
                                <div><p className=" font-bold">%</p></div>
                                <div><p className=" font-bold">%</p></div>
                                <div><p className=" font-bold">%</p></div>


                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};