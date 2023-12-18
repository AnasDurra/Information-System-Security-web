import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./index.css";
import Root from "./routes/root.jsx";
import ErrorPage from "./error-page.jsx";
import Register from "./routes/registration/Register.jsx";
import Login from "./routes/registration/Login.jsx";
import InformationCompletion from "./routes/information completion/InformationCompletion.jsx";
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
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "information-completion",
                element: <InformationCompletion />,
            },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
);
