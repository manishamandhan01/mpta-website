
import './App.css'
import { RouteObject, useRoutes } from 'react-router-dom';
import {Layout} from "./Components/Layout/Layout.tsx";
import {PositionCalculator} from "./Components/Calculators/PositionCalculator.tsx";
function App() {
    const route : RouteObject[]=[
        {
            path:"/",
            element:<Layout/>,
            children:[
                {
                    path:"PositionCalculator/*",
                    element: (
                        <PositionCalculator/>
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
