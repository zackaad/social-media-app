import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage'; // Assuming components are in a separate folder
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegisterPage';
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const MyRouter = createBrowserRouter([
    // Define routes here
    {
        path: "/",
        element: <LoginPage />, // Home page as default
    },
    {
        path: "/home",
        element: <HomePage />,
    },
    {
        path: "/register",
        element: <RegisterPage />,
    },
    // Add more routes for other pages as needed
]);

export default MyRouter;
