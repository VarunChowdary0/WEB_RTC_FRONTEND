import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
                }   from "react-router-dom";
import MainPage from './components/MainPage';

const router = createBrowserRouter([
    {
        path: "/",
        element: 
        <h1 className="text-3xl font-bold ">
            Hello world!
        </h1>
    },
    {
        path: '/videoCall',
        element:
        <>
            <MainPage/>
        </>
    }
]);

const App = () => {
    return (
            <React.StrictMode>
                <RouterProvider  router={router} />
            </React.StrictMode>
        )
  }

export default App