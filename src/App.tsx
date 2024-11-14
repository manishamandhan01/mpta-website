
import './App.css'
import { RouteObject, useRoutes } from 'react-router-dom';
import {Layout} from "./Components/Layout/Layout.tsx";
function App() {
    const route : RouteObject[]=[
        {
            path:"/",
            element:<Layout/>,
            children:[
                {}
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
