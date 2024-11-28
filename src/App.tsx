

import { RouteObject, useRoutes } from 'react-router-dom';
import {Layout} from "./Components/Layout/Layout.tsx";
import './App.css'
import {MiddleSectionB} from "@Components/Layout/MiddleSection(Bootstrap).tsx";
import {CalculatorsB} from "@Components/Calculators/Calculator(bootstrap).tsx";
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
