// socket.js
import { io } from 'socket.io-client';
import bcrypt from 'bcryptjs';
import { encrypt, generateRSAKeyPair, signData } from './encryption.js';

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

function generateIV(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    result += characters.charAt(randomIndex);
  }
  return result;
}
