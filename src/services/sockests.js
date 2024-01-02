// socket.js
import {io} from 'socket.io-client';
import bcrypt from "bcryptjs";
import {encrypt} from "./encryption.js";
import Cookies from 'js-cookie';
import generateKeyPairs from './keys.js';

//const {token} = useAuth();

// Use the token when creating socket connections
export const authSocket = io('https://university-server-backend-service.onrender.com/auth', {
    autoConnect: false,
});
export const authSocketLogin = (data) => {
    authSocket.emit('login', data);
}
export const authSocketRegisterProfessor = (data) => {
    authSocket.emit('registerProfessor', data);
};

export const authSocketRegisterStudent = (data) => {
    authSocket.emit('registerStudent', data);
};


export const completeInfoSocket = io('https://university-server-backend-service.onrender.com/complete', {
    autoConnect: false,
});
export const completeInfoSocketRequest = async (data, password) => {
    const base64_data = btoa(JSON.stringify(data).toString());
    const hashedPassword = await bcrypt.hash(password, 10);
    const iv = btoa(String.fromCharCode.apply(null, window.crypto.getRandomValues(new Uint8Array(16))))
    const encryptedData = encrypt(JSON.stringify(data), password, iv);

    completeInfoSocket.emit("completeInfo", {data: encryptedData, iv});
}




export let handshakingSocket = io('https://university-server-backend-service.onrender.com/subjects', {
    autoConnect: false,
});

// Function to reinitialize the socket
export const sethandshakingSocketHeader = (authToken) => {
    const headers = {
      Authorization: authToken,
    };
  
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


function generateIV(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      result += characters.charAt(randomIndex);
    }
    return result;
  }
  