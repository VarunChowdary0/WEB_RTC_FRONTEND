import React from 'react'
import {
  createBrowserRouter,
  RouterProvider,
                }   from "react-router-dom";
import MainPage from './components/MainPage';
import Home from './components/Home';

const router = createBrowserRouter([
    {
        path: "/",
        element: 
        <Home/>
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