import { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginPage from "./routes/LoginPage/LoginPage";
import { Layout, RequireAuth } from "./routes/layout/Layout";
import Register from "./routes/Register/Register";
import HomePage from "./routes/HomePage/HomePage";
import { homePageLoader } from "./lib/loaders";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/",
          element: <HomePage />,
          loader: homePageLoader,
        },
      ],
    },
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/login",
          element: <LoginPage />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;
