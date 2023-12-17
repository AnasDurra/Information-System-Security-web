import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import Root from "./routes/root.jsx";
import Home from "./routes/home/home.jsx";
import ErrorPage from "./error-page.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [{}],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
);
