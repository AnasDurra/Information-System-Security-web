import {io} from "socket.io-client";
import {URL} from "./constants.js";

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