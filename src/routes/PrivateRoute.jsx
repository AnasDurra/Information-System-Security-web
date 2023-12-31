import React, { useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/AuthContext.jsx';

const PrivateRoute = ({ component }) => {
  const { token } = useAuth();

  useEffect(() => {
    console.log('token: ', token);
  }, [token]);

  return <>{token ? component : <Navigate to="/login" />}</>;
};

export default PrivateRoute;
