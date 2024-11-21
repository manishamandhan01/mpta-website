
import './App.css'
import { RouteObject, useRoutes } from 'react-router-dom';
import {Layout} from "./Components/Layout/Layout.tsx";
import {Calculators} from "./Components/Calculators/Calculator.tsx";
import {MiddleSection} from "./Components/Layout/MiddleSection.tsx";
function App() {
    const route : RouteObject[]=[
        {
            path:"/",
            element:<Layout/>,
            children:[
                {
                    path:"home/*",
                    element: (
                        <MiddleSection/>
                    ),
                },
                {
                    path:"calculators/*",
                    element: (
                        <Calculators/>
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
