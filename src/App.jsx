import React, { useEffect, useState } from 'react';
import forge from 'node-forge';
import { useAuth } from './hooks/AuthContext.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import {
  authSocket,
  completeInfoSocket,
  handshakingSocket,
  requestSessionKeyExchange,
  responsePublicKeyExchange,
  sethandshakingSocketHeader,
  marksSocket,
} from './services/sockests.js';
import generateKeyPairs from './services/keys.js';
import Cookies from 'js-cookie';
import { hash } from 'bcryptjs';
import { decrypt } from './services/encryption.js';

// Importing the v4 function from the uuid library
// import { v4 as uuidv4 } from "uuid";
// import { io } from "socket.io-client";

function App() {
  const { login, token: authToken } = useAuth();
  // const [sessionKey, setSessionKey] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      Cookies.remove('sessionKey');
      Cookies.remove('serverPublicKey');

      sethandshakingSocketHeader(authToken);
      handshakingSocket.connect();

      handshakingSocket.on('handshakingResult', onCompleteHandshakingResult);
      handshakingSocket.on('requestPublicKeyExchange', onRequestPublicKeyExchange);
      handshakingSocket.on('responseSessionKeyExchange', onResponseSessionKeyExchangeResult);
      handshakingSocket.on('responseSubmitProjects', onResponseSubmitProjects);

      function onResponseSubmitProjects(msg) {
        console.log(msg);
      }

      function onCompleteHandshakingResult(msg) {
        console.log('handshaking failed with message:', msg);
      }

      function onRequestPublicKeyExchange(msg) {
        // console.log("data", msg);
        const ServerPublicKeyPem = msg.data.publicKey;
        // console.log("server public key:", ServerPublicKeyPem);
        Cookies.set('serverPublicKey', ServerPublicKeyPem);
        const ServerPublicKey = forge.pki.publicKeyFromPem(ServerPublicKeyPem);

        const MyPublicKey = Cookies.get('publicKey');
        responsePublicKeyExchange({ publicKey: MyPublicKey });

        // Generate session key and request for exchange
        generateSessionKey().then((result) => {
          Cookies.set('sessionKey', result);
          console.log('session key generated: ', result);

          // Encrypt the session key using the server public key
          const encrypted = ServerPublicKey.encrypt(result, 'RSA-OAEP');

          // const encKeyToSend = forge.util.encode64(encrypted);
          requestSessionKeyExchange({ sessionKey: encrypted });

          console.log(encrypted);
        });
      }

      function onResponseSessionKeyExchangeResult(msg) {
        console.log('session key was exchanged successfully', msg);
      }

      async function generateSessionKey() {
        const data = {
          timestamp: Date.now(),
        };
        // console.log("hashed", hash(JSON.stringify(data), 10));
        return await hash(JSON.stringify(data), 10);
      }
    }

    completeInfoSocket.auth = {
      ...completeInfoSocket.auth,
      auth: `Bearer ${authToken}`,
    };
    completeInfoSocket.connect();

    authSocket.on('registrationResult', onRegistrationResultEvent);
    authSocket.on('loginResult', onLoginResultEvent);
    completeInfoSocket.on('completeInfoResult', onCompleteInfoResult);
    marksSocket.on('addMarksResult', onAddMarksResult);

    function onLoginResultEvent(msg) {
      // // TODO Delete this

      const privateKey = Cookies.get('privateKey');
      const publicKey = Cookies.get('publicKey');

      if (!privateKey || !publicKey) {
        handleKeys();
      }
      // //
      console.log('Received message from server:', msg);
      if (msg.status >= 400 && msg.status < 500) console.log('LOGIN REJECTED', msg.error);
      else if (msg.status >= 200 && msg.status < 300) {
        console.log('LOGIN ACCEPTED');
        login(msg.data.access_token);

        if (!(privateKey && publicKey)) {
          console.log('nooo keys');
          handleKeys();
        }

        navigate('/', { replace: true });
      }
    }

    async function handleKeys() {
      try {
        const { publicKey, privateKey } = await generateKeyPairs();
        Cookies.set('publicKey', publicKey);
        Cookies.set('privateKey', privateKey);
      } catch (error) {
        console.error('Error generating or setting keys:', error);
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

      const sessionKey = Cookies.get('sessionKey');
      console.log('sessionKey', sessionKey);
      if (msg.data && msg.iv && sessionKey) console.log('decrypt: ', decrypt(msg.data, sessionKey, msg.iv));

      const privateKey = Cookies.get('privateKey');
      const publicKey = Cookies.get('publicKey');

      if (!privateKey || !publicKey) {
        const { publicKey, privateKey } = generateKeyPairs();

        Cookies.set('publicKey', publicKey);
        Cookies.set('privateKey', privateKey);
      }
    }

    function onAddMarksResult(msg) {
      console.log('Received message from server:', msg);
    }

    return () => {
      authSocket.off('registrationResult', onRegistrationResultEvent);
      authSocket.off('loginResult', onLoginResultEvent);
      authSocket.off('completeInfoResult', onLoginResultEvent);
      authSocket.off('addMarksResult', onLoginResultEvent);
    };
  }, [authToken]);

  return <Outlet />;
}

export default App;
