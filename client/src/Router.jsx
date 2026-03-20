import { createBrowserRouter, redirect } from "react-router";
import { RouterProvider } from "react-router/dom";

import App from './App'
import Home from './features/Home/Home'
import ShaderBackground from "./features/Background/ShaderBackground";
import Ludozone from "./features/Ludozone/Ludozone";

export default function Router() {
  return (
    <RouterProvider router={router} />
  )
}

const middlewareTemplate = async ({ request }, next) => {
  console.log(request);
  next();
}

const router = createBrowserRouter([
    {
        path: "/",
        Component: App,
        children: [
        { index: true, Component: Home },
        { 
            path: 'ludozone',
            Component: Ludozone,
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