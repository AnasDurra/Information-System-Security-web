// socket.js
import { io } from 'socket.io-client';
import bcrypt from 'bcryptjs';
import { encrypt, generateRSAKeyPair, signData } from './encryption.js';

const URL = 'https://university-server-backend-service.onrender.com';

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
  const hashedPassword = await bcrypt.hash(password, 10);
  const iv = generateIV(32);
  const encryptedData = encrypt(base64_data, hashedPassword, iv);
  
  completeInfoSocket.emit('completeInfo', { data: encryptedData, iv, access_token });
};

export const marksSocket = io(URL + '/marks', {
  autoConnect: false,
});
export const marksSocketAdd = (data) => {
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
