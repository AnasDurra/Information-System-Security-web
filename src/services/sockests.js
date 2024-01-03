// socket.js
import { io } from 'socket.io-client';
import bcrypt from 'bcryptjs';
import { encrypt, generateRSAKeyPair, signData } from './encryption.js';
import Cookies from 'js-cookie';

const URL = 'https://university-server-backend-service.onrender.com';
//const URL = 'http://localhost:3000';

export const authSocket = io(URL + '/auth', {
  autoConnect: false,
});
export const authSocketLogin = (data) => {
  authSocket.emit('login', data);
};
export const authSocketRegisterProfessor = (data) => {
  authSocket.emit('registerProfessor', data);
};

export const authSocketRegisterStudent = (data) => {
  authSocket.emit('registerStudent', data);
};

export const completeInfoSocket = io(URL + '/complete', {
  autoConnect: false,
});
export const completeInfoSocketRequest = async (data, password, access_token) => {
  const base64_data = btoa(JSON.stringify(data).toString());
  const salt = '$2a$10$zIGEx6kcy6xrD0/fpgjqz.';
  const hashedPassword = await bcrypt.hash(password, salt);
  const iv = generateIV(32);
  const encryptedData = encrypt(base64_data, hashedPassword, iv);

  completeInfoSocket.emit('completeInfo', { data: encryptedData, iv, access_token });
};

export const marksSocket = io(URL + '/marks', {
  autoConnect: false,
});
export const marksSocketAdd = (data, access_token) => {
  const base64_data = btoa(JSON.stringify(data).toString());
  //TODO get the session key from cookies
  const sessionKey = 'whateva5000';
  const iv = generateIV(32);

  const { privateKey, publicKeyPem } = generateRSAKeyPair();
  const signature = signData(base64_data, privateKey);

  const encryptedData = encrypt(base64_data, sessionKey, iv);

  const msg = {
    signature: signature,
    pub_key: publicKeyPem,
    iv: iv,
    data: encryptedData,
    token: access_token,
  };

  marksSocket.emit('addMarks', msg);
};

export const getMarksViaCertificate = (data) => {
  marksSocket.emit('addMarks', data);
};

function generateIV(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}


export let handshakingSocket = io('https://university-server-backend-service.onrender.com/subjects', {
    autoConnect: false,
});

// Function to reinitialize the socket
export const sethandshakingSocketHeader = (headers) => {
    // Close the existing socket connection if it's open
    if (handshakingSocket.connected) {
      handshakingSocket.disconnect();
    }
  
    // Create a new socket instance with updated headers
    handshakingSocket = io('https://university-server-backend-service.onrender.com/subjects', {
      autoConnect: false,
      extraHeaders: headers,
    });
  };
export const responsePublicKeyExchange = async (data) => {
    handshakingSocket.emit("responsePublicKeyExchange",data);
    // console.log("done"); 
}

export const requestSessionKeyExchange = async (data) => {
    handshakingSocket.emit("requestSessionKeyExchange",data);
    console.log("done"); 
}

export const requestGetAllSubjects = async () => {
    handshakingSocket.emit("getAllSubjects");  
}

export const requestSubmitProjects = async (data) => {
  const base64_data = btoa(JSON.stringify(data).toString());
  const iv = generateIV(32);
  console.log("in socket",Cookies.get('sessionKey'));
  const encryptedData = encrypt(base64_data, Cookies.get('sessionKey'), iv);

  handshakingSocket.emit("submitProjects", {data: encryptedData, iv});
}



export const authoritySocket = io('https://university-server-backend-service.onrender.com/authority', {
  autoConnect: false,
});

export const requestSignCertificate = async (data) => {
  // console.log(data);
  authoritySocket.emit("signCertificate",data);
}

export const requestChallengeAswer = async (data) => {
  console.log(data);
  authoritySocket.emit("challengeAnswer",data);
}


export const getSocket = io('https://university-server-backend-service.onrender.com/getSocket', {
  autoConnect: false,
});

export const requestGetTeacherSubjects = async (data) => {
  console.log(data);
  getSocket.emit("getTeacherSubjects",data);
}
