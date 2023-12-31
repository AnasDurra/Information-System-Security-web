import React, { useEffect } from 'react';
import { useAuth } from './hooks/AuthContext.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { authSocket } from './services/sockests.js';

function App() {
  const { login } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    authSocket.on('registrationResult', onRegistrationResultEvent);
    authSocket.on('loginResult', onLoginResultEvent);
    authSocket.on('completeInfoResult', onCompleteInfoResult);

    function onLoginResultEvent(msg) {
      console.log('Received message from server:', msg);
      if (msg.status >= 400 && msg.status < 500) console.log('LOGIN REJECTED', msg.error);
      else if (msg.status >= 200 && msg.status < 300) {
        console.log('LOGIN ACCEPTED');
        login(msg.data.access_token);

        navigate('/', { replace: true });
      }
    }

    function onRegistrationResultEvent(msg) {
      console.log('Received message from server:', msg);
      if (msg.status >= 400 && msg.status < 500) console.log('REGISTER REJECTED');
      else if (msg.status >= 200 && msg.status < 300) {
        console.log('REGISTER ACCEPTED');

        login(msg.data.access_token);

        navigate('/');
      }
    }

    function onCompleteInfoResult(msg) {
      console.log('Received message from server:', msg);
    }

    return () => {
      authSocket.off('registrationResult', onRegistrationResultEvent);
      authSocket.off('loginResult', onLoginResultEvent);
    };
  }, []);

  return <Outlet />;
}

export default App;
