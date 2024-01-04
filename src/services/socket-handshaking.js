import {io} from "socket.io-client";
import {URL} from "./constants.js";
import Cookies from "js-cookie";
import {encrypt} from "./encryption.js";
import {generateIV} from "./encryption.js";

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
};

export const requestSessionKeyExchange = async (data) => {
    handshakingSocket.emit('requestSessionKeyExchange', data);
};

export const requestGetAllSubjects = async () => {
    handshakingSocket.emit('getAllSubjects');
};

export const requestSubmitProjects = async (data) => {
    const base64_data = btoa(JSON.stringify(data).toString());
    const iv = generateIV(32);
    const encryptedData = encrypt(base64_data, Cookies.get('sessionKey'), iv);

    handshakingSocket.emit('submitProjects', { data: encryptedData, iv });
};