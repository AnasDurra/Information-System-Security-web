// socket.js
import {io} from 'socket.io-client';
import bcrypt from "bcryptjs";
import {encrypt} from "./encryption.js";

//const {token} = useAuth();

// Use the token when creating socket connections
export const authSocket = io('http://localhost:3000/auth', {
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


export const completeInfoSocket = io('http://localhost:3000/complete', {
    autoConnect: false,
});
export const completeInfoSocketRequest = async (data, password) => {
    const base64_data = btoa(JSON.stringify(data).toString());
    const hashedPassword = await bcrypt.hash(password, 10);
    const iv = btoa(String.fromCharCode.apply(null, window.crypto.getRandomValues(new Uint8Array(16))))
    const encryptedData = encrypt(JSON.stringify(data), password, iv);

    completeInfoSocket.emit("completeInfo", {data: encryptedData, iv});
}


