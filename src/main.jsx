import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import "./index.css";
import Root from "./routes/root.jsx";
import Home from "./routes/home/home.jsx";
import ErrorPage from "./error-page.jsx";
import ViewNewMarks from "./routes/marks/view-newMarks.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [{
            path: "marks",
            element: <ViewNewMarks/>
        }],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider>
        <RouterProvider router={router}/>
    </ConfigProvider>
);
