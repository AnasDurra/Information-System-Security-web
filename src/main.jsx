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
import Verification from "./routes/verification/Verification.jsx";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
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
      {
        path: "verification",
        element: <Verification />,
      },
      {
        path: "marks",
        element: <ViewNewMarks />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
);
