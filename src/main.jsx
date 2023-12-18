import React from "react";
import ReactDOM from "react-dom/client";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {ConfigProvider} from "antd";
import "./index.css";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Register from "./routes/registration/Register.jsx";
import Login from "./routes/registration/Login.jsx";
import InformationCompletion from "./routes/information completion/InformationCompletion.jsx";
import ViewNewMarks from "./routes/marks/view-newMarks.jsx";
import ViewMarks from "./routes/marks/view-marks.jsx";
import ViewNewDescription from "./routes/practical subjects desctiption submissions/view-newDescription.jsx";
import ViewDescriptions from "./routes/practical subjects desctiption submissions/view-descriptions.jsx";

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
            {
                path: "descriptions",
                children: [
                    {
                        path: 'new',
                        element: <ViewNewDescription/>
                    },
                    {
                        path: "view",
                        element: <ViewDescriptions/>
                    },
                ]
            },

            {
                path: "register",
                element: <Register/>,
            },
            {
                path: "login",
                element: <Login/>,
            },
            {
                path: "information-completion",
                element: <InformationCompletion/>,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <ConfigProvider>
        <RouterProvider router={router}/>
    </ConfigProvider>
);
