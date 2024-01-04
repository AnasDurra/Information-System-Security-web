import React, { useEffect, useState } from 'react';
import forge from 'node-forge';
import { useAuth } from './hooks/AuthContext.jsx';
import { Outlet, useNavigate } from 'react-router-dom';
import { authSocket } from './services/socket-auth.js'
import { completeInfoSocket } from './services/socket-complete info.js'
import { handshakingSocket, sethandshakingSocketHeader, responsePublicKeyExchange, requestSessionKeyExchange } from './services/socket-handshaking.js'
import { marksSocket } from './services/socket-marks.js'
import { authoritySocket, requestSignCertificate } from './services/socket-authority.js'
import { getSocket } from './services/socket-get.js'
import { generateKeyPairs } from './services/encryption.js';
import Cookies from 'js-cookie';
import { hash } from 'bcryptjs';
import { decrypt } from './services/encryption.js';
import Verification from './routes/verification/Verification.jsx';
import { Spin } from 'antd';
import { useStudents } from './hooks/StudentsContext.jsx';
import { useSubjects } from './hooks/SubjectsContext.jsx';
import { useDescriptions } from './hooks/DescriptionsContext.jsx';
import { useCertificate } from './hooks/CertificateContext.jsx';
import { usePassword } from './hooks/passwordContext.jsx';


// Importing the v4 function from the uuid library
// import { v4 as uuidv4 } from "uuid";
// import { io } from "socket.io-client";

function App() {
  const { login, token: authToken } = useAuth();
  const { students, setAllStudents } = useStudents();
  const { subjects, setAllSubjects } = useSubjects();
  const { descriptions, setAllDescriptions } = useDescriptions();
  const { certificate, setCertificate } = useCertificate();

  const [user, setUser] = useState(null);
  const [showVerification, setShowVerification] = useState(false);
  const [equation, setEquation] = useState('');
  const [hasVerified, setHasVerified] = useState(false);
  // const [certificate, setCertificate] = useState(null);

  const [doneHandShaking, setDoneHandShaking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    if (authToken) {
      Cookies.remove('sessionKey');
      Cookies.remove('serverPublicKey');

      if (!hasVerified) {
        // Q5
        authoritySocket.connect();
        requestSignCertificate({
          user_id: user.user_id,
          role_id: user.role_id,
          public_key: Cookies.get('publicKey'),
        });
        console.log(authoritySocket);
      } else {
        console.log('Verified');
        sethandshakingSocketHeader({
          Authorization: authToken,
          certificate: btoa(JSON.stringify(certificate).toString()),
        });
        handshakingSocket.connect();
        setDoneHandShaking(false);
        // console.log(handshakingSocket);
      }

      authoritySocket.on('challenge', onChallengeEvent);
      authoritySocket.on('certificate', onCertificateResult);

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
        setDoneHandShaking(true);
      }

      async function generateSessionKey() {
        const data = {
          timestamp: Date.now(),
        };
        // console.log("hashed", hash(JSON.stringify(data), 10));
        return await hash(JSON.stringify(data), 10);
      }
    }

    // move them
    function onChallengeEvent(msg) {
      setEquation(msg.challenge);
      setShowVerification(true);
      // console.log('Challenge is :', msg);
    }

    function onCertificateResult(msg) {
      if (msg.status === 200) {
        setTimeout(() => {
          setShowVerification(false);
          setHasVerified(true);
          setCertificate(msg.certificate);
        }, 2000);
        // console.log(msg.certificate);
      }
    }

    completeInfoSocket.auth = {
      ...completeInfoSocket.auth,
      auth: `Bearer ${authToken}`,
    };
    completeInfoSocket.connect();

    return () => {
      authoritySocket.off('challenge', onChallengeEvent);
    };
  }, [authToken, hasVerified]);

  useEffect(() => {
    getSocket.connect();

    authSocket.on('registrationResult', onRegistrationResultEvent);
    authSocket.on('loginResult', onLoginResultEvent);
    completeInfoSocket.on('completeInfoResult', onCompleteInfoResult);
    marksSocket.on('addMarksResult', onAddMarksResult);
    getSocket.on('result', onGetTeacherSubjectsResult);
    getSocket.on('getStudentsResponse', onGetStudentsResult);
    getSocket.on('getSubjectProjectsResponse', onGetSubjectDescriptions);

    async function handleKeys() {
      try {
        const { publicKey, privateKey } = await generateKeyPairs();
        Cookies.set('publicKey', publicKey);
        Cookies.set('privateKey', privateKey);
      } catch (error) {
        console.error('Error generating or setting keys:', error);
      }
    }

    function onLoginResultEvent(msg) {
      console.log(msg);
      setUser(msg.data);
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

        //TODO encrypt
        login(msg.data.access_token);

        if (!(privateKey && publicKey)) {
          console.log('nooo keys');
          handleKeys();
        }

        navigate('/', { replace: true });
      }
    }

    function onRegistrationResultEvent(msg) {
      console.log('Received message from server:', msg);
      if (msg.status >= 400 && msg.status < 500) console.log('REGISTER REJECTED');
      else if (msg.status >= 200 && msg.status < 300) {
        console.log('REGISTER ACCEPTED');
        setUser(msg.data);
        login(msg.data.access_token);

        navigate('/');
      }
    }

    function onCompleteInfoResult(msg) {
      console.log('Received message from server:', msg);

      const sessionKey = Cookies.get('sessionKey');
      /*   console.log('sessionKey', sessionKey); */
      const password = Cookies.get('password')
      if (msg.data && msg.iv && sessionKey) console.log('decrypt: ', JSON.parse(atob(decrypt(msg.data, password, msg.iv))) );

      const privateKey = Cookies.get('privateKey');
      const publicKey = Cookies.get('publicKey');

      if (!privateKey || !publicKey) {
        const { publicKey, privateKey } = generateKeyPairs();

        Cookies.set('publicKey', publicKey);
        Cookies.set('privateKey', privateKey);
      }
    }

    function onAddMarksResult(msg) {
      console.log('Received message from server add marks:', msg);
    }

    function onGetTeacherSubjectsResult(msg) {
      console.log('Received message from server:', msg);
      setAllSubjects(msg);

    }

    function onGetStudentsResult(msg) {
      console.log('Received message from server:', msg);
      if (msg.status >= 200 && msg.status < 300) {
        setAllStudents(msg.data);
      }
    }

    function onGetSubjectDescriptions(msg) {
      console.log('Received message from server:', msg);
      if (msg.status >= 200 && msg.status < 300) {
        setAllDescriptions(msg.data);
      }
    }

    return () => {
      authSocket.off('registrationResult', onRegistrationResultEvent);
      authSocket.off('loginResult', onLoginResultEvent);
      completeInfoSocket.off('completeInfoResult', onCompleteInfoResult);
      marksSocket.off('addMarksResult', onAddMarksResult);
      getSocket.off('result', onGetTeacherSubjectsResult);
      getSocket.off('getStudentsResponse', onGetStudentsResult);
      getSocket.off('getSubjectProjectsResponse', onGetSubjectDescriptions);

      getSocket.disconnect();
    };
  }, []);

  return (
    <>
      <Spin spinning={!doneHandShaking}>
        {showVerification && <Verification equation={equation} />}

        {!showVerification && <Outlet />}
      </Spin>
    </>
  );
}

export default App;
