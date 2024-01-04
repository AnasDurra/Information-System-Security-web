import { createBrowserRouter } from 'react-router-dom';
import Root from './root.jsx';
import ErrorPage from '../error-page.jsx';
import PrivateRoute from './PrivateRoute.jsx';
import ViewLandingMarks from './marks/view-landing-marks.jsx';
import ViewNewMarks from './marks/view-newMarks.jsx';
import ViewMarks from './marks/view-marks.jsx';
import ViewLandingDescriptions from './practical subjects desctiption submissions/view-landing-descriptions.jsx';
import ViewNewDescription from './practical subjects desctiption submissions/view-newDescription.jsx';
import ViewDescriptions from './practical subjects desctiption submissions/view-descriptions.jsx';
import Register from './registration/Register.jsx';
import Login from './registration/Login.jsx';
import InformationCompletion from './information completion/InformationCompletion.jsx';
import Verification from './verification/Verification.jsx';
import React from 'react';
import Home from './home/home.jsx';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PrivateRoute component={<Home />} />,
      },
      {
        path: 'marks',
        children: [
          {
            index: true,
            element: <PrivateRoute component={<ViewLandingMarks />} />,
          },
          {
            path: 'new',
            element: <PrivateRoute component={<ViewNewMarks />} />,
          },
          {
            path: 'view',
            element: <PrivateRoute component={<ViewMarks />} />,
          },
        ],
      },
      {
        path: 'descriptions',
        children: [
          {
            index: true,
            element: <PrivateRoute component={<ViewLandingDescriptions />} />,
          },
          {
            path: 'new',
            element: <PrivateRoute component={<ViewNewDescription />} />,
          },
          {
            path: 'view',
            element: <PrivateRoute component={<ViewDescriptions />} />,
          },
        ],
      },

      {
        path: 'register',
        element: <Register />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'information-completion',
        element: <PrivateRoute component={<InformationCompletion />} />,
      },
      {
        path: 'verification',
        element: <Verification />,
      },
    ],
  },
]);
