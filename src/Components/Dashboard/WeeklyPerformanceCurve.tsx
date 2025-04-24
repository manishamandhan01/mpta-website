import * as React from 'react';
import {useEffect} from 'react';
import {PerformancePeriod, QuarterlyPnl} from "@Components/Utils/Constants.tsx";
import {useGlobalStore, useTradeResults} from "@Components/DataGrid/GlobalState.tsx";


type ApiResponse = {
    performance_per_period: PerformancePeriod;
};

type Props = {};

export const WeeklyPerformanceCurve = (props: Props) => {
    const {tradeRows} = useGlobalStore();
    const [quarterlyPnl, setQuarterlyPnl] = React.useState<QuarterlyPnl>({});
    const [thisMonthPnl, setThisMonthPnl] = React.useState(0);
    const [yearToDatePnl, setYearToDatePnl] = React.useState(-68);
    const [previousYearToDate, setPreviousYearToDate] = React.useState(0);
    const { fetchTradeResults } = useTradeResults();

    // Fetch data from the backend and update the state
    const fetchPerformancePerRecord = () => {
        fetchTradeResults()
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
        <div className="col-xl-4 col-md-6 col-sm-12 ms-5 mb-5 ">
            <div className=" box-12">
                <div className="main_heading_card"><h1
                    className="font_poppins heading-20 line_height_32 font_weight_400 mt-5 ">Weekly Performance Curve</h1>
                </div>
                <div className="main_heading_card">
                    <hr/>

                </div>
                <div className="dashboard-overall-performance-card">

                    <div className="amounts">


                    </div>
                </div>
            </div>
        </div>
    );
};
