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

export const authSocketLogin = (credentials) => {
  authSocket.emit('login', credentials);
};

export const authSocketRegisterProfessor = (credentials) => {
  authSocket.emit('registerProfessor', credentials);
};

export const authSocketRegisterStudent = (credentials) => {
  authSocket.emit('registerStudent', credentials);
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

export function generateIV(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}

export let handshakingSocket = io(URL + '/subjects', {
  autoConnect: false,
});

// Function to reinitialize the socket
export const sethandshakingSocketHeader = (headers) => {
  // Close the existing socket connection if it's open
  if (handshakingSocket.connected) {
    handshakingSocket.disconnect();
  }

  // Create a new socket instance with updated headers
  handshakingSocket = io(URL + '/subjects', {
    autoConnect: false,
    extraHeaders: headers,
  });
};
export const responsePublicKeyExchange = async (data) => {
  handshakingSocket.emit('responsePublicKeyExchange', data);
  // console.log("done");
};

export const requestSessionKeyExchange = async (data) => {
  handshakingSocket.emit('requestSessionKeyExchange', data);
  console.log('done');
};

export const requestGetAllSubjects = async () => {
  handshakingSocket.emit('getAllSubjects');
};

export const requestSubmitProjects = async (data) => {
  const base64_data = btoa(JSON.stringify(data).toString());
  const iv = generateIV(32);
  console.log('in socket', Cookies.get('sessionKey'));
  const encryptedData = encrypt(base64_data, Cookies.get('sessionKey'), iv);

  handshakingSocket.emit('submitProjects', { data: encryptedData, iv });
};

export const authoritySocket = io(URL + '/authority', {
  autoConnect: false,
});

export const requestSignCertificate = async (data) => {
  // console.log(data);
  authoritySocket.emit('signCertificate', data);
};

export const requestChallengeAswer = async (data) => {
  console.log(data);
  authoritySocket.emit('challengeAnswer', data);
};

export const getSocket = io(URL + '/getSocket', {
  autoConnect: false,
});

export const requestGetTeacherSubjects = async (data) => {
  console.log(data);
  getSocket.emit('getTeacherSubjects', data);
};

export const getSocketGetTeacherSubjects = (token) => {
  getSocket.emit('getTeacherSubjects', { access_token: token });
};

export const getSocketGetAllStudents = (token) => {
  getSocket.emit('getStudents', { access_token: token });
};

export const getSocketGetAllDescriptions = (token) => {
  getSocket.emit('getAllDescriptions', token);
};

export const getSocketGetSubjectDescriptions = (token, subject_id) => {
  getSocket.emit('getSubjectProjects', { access_token: token, subject_id });
};
