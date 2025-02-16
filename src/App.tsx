

import { RouteObject, useRoutes } from 'react-router-dom';
import {Layout} from "./Components/Layout/Layout.tsx";
import './App.css'
import {MiddleSectionB} from "@Components/Layout/MiddleSection(Bootstrap).tsx";
import {CalculatorsB} from "@Components/Calculators/Calculator(bootstrap).tsx";
import 'react-tooltip/dist/react-tooltip.css'
import {CandleChart} from "@Components/Charts/CandleChart.tsx";
import {Dashboard} from "@Components/Dashboard/Dashboard.tsx";
import {Calendar} from "@Components/Calender/Calender.tsx";

function App() {
    const route : RouteObject[]=[
        {
            path:"/",
            element:<Layout/>,
            children:[
                {
                    index: true,
                    element: (
                        <MiddleSectionB/>
                    ),
                },
                {
                    path:"calculators",
                    element: (
                        <CalculatorsB/>
                    ),
                },
                {
                    path:"charts",
                    element: (
                        <CandleChart/>
                    ),
                },
                {
                    path:"dashboard",
                    element: (
                        <Dashboard/>
                    ),
                },
                {
                    path:"calender",
                    element: (
                        <Calendar/>
                    ),
                },

            ],

        }
    ]
    const  context = useRoutes(route);

  return (
    <>

            {context}

    </>
  );
}

export default App
