import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import "./index.css";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import ViewNewMarks from "./routes/marks/view-newMarks.jsx";
import ViewMarks from "./routes/marks/view-Marks.jsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root/>,
        errorElement: <ErrorPage/>,
        children: [
            {
                path: "marks",
                children: [
                    {
                        path: 'new',
                        element: <ViewNewMarks/>
                    },
                    {
                        path: "view",
                        element: <ViewMarks/>
                    },
                ]
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider>
        <RouterProvider router={router}/>
    </ConfigProvider>
);
