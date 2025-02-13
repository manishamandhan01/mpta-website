import * as React from 'react';
import {useEffect} from 'react';
import {PerformancePeriod, QuarterlyPnl} from "@Components/Utils/Constants.tsx";


type ApiResponse = {
    performance_per_period: PerformancePeriod;
};

type Props = {};

export const WeeklyPerformanceCurve = (props: Props) => {
    const [quarterlyPnl, setQuarterlyPnl] = React.useState<QuarterlyPnl>({});
    const [thisMonthPnl, setThisMonthPnl] = React.useState(0);
    const [yearToDatePnl, setYearToDatePnl] = React.useState(-68);
    const [previousYearToDate, setPreviousYearToDate] = React.useState(0);

    // Fetch data from the backend and update the state
    const fetchPerformancePerRecord = () => {
        fetch('http://localhost:8000/dashboard/overall_performance/get_results?format=json', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((res) => res.json())
            .then((json: ApiResponse) => {
                const performance_per_period = json.performance_per_period;
                setQuarterlyPnl(performance_per_period.quarterly_pnl);
                setThisMonthPnl(performance_per_period.this_month_pnl);
                // setYearToDatePnl(performance_per_period.year_to_date_pnl);
                setPreviousYearToDate(performance_per_period.previous_year_to_date_pnl);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        fetchPerformancePerRecord();
    }, []);

    // Function to round numbers to 2 decimal places


    return (
        <div className="col-xl-3 col-lg-6 col-md-6 col-sm-12 ">
            <div className="card-container box-12">
                <div><h1 className="linear-gradient-headings">
                   Weekly Performance Curve
                </h1></div>
                <div className="dashboard-overall-performance-card">

                    <div className="amounts">



                    </div>
                </div>
            </div>
        </div>
    );
};
