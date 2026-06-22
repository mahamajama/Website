import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";

import App from './App'
import Home from './features/Home/Home'
import ShaderBackground from "./features/Background/ShaderBackground";
import Ludozone from "./features/Ludozone/Ludozone";
import PortfolioRedirect from "./features/Portfolio/PortfolioRedirect";
import HotFire from "./features/HotFire/HotFire";

export default function Router() {
  return (
    <RouterProvider router={router} />
  )
}

const middleware = async ({ request }, next) => {
  console.log(request);
  next();
}

async function loader({ params }) {
  return { message: 'hello world' };
}

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
            {
                index: true, 
                Component: Home,
            },
            { 
                path: 'ludozone',
                Component: Ludozone,
            },
            { 
                path: 'portfolio',
                Component: PortfolioRedirect,
            },
            { 
                path: 'hotfire',
                Component: HotFire,
            },
        ],
    },
    { 
        path: 'shader',
        Component: ShaderBackground,
        children: [
            //{ index: true, Component: ShaderBackground },
        ],
    },
]);