import {io} from "socket.io-client";
import {URL} from "./constants.js";
import {encrypt, generateRSAKeyPair, signData} from "./encryption.js";
import {generateIV} from "./encryption.js";
import Cookies from "js-cookie";

export let marksSocket = io(URL + '/marks', {
    autoConnect: false,
});


// Function to reinitialize the socket
export const setMarksSocketHeader = (headers) => {
    // Close the existing socket connection if it's open
    if (setMarksSocketHeader.connected) {
        setMarksSocketHeader.disconnect();
    }

    // Create a new socket instance with updated headers
    marksSocket = io(URL + '/marks', {
        autoConnect: false,
        extraHeaders: headers,
    });
};

export const marksSocketAdd = (data, access_token) => {
    const base64_data = btoa(JSON.stringify(data).toString());
    //TODO get the session key from cookies
    const sessionKey = Cookies.get('sessionKey');
    console.log("sessionKey: ",sessionKey)
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
    console.log('marks socktt: ',marksSocket.connected)

    marksSocket.emit('addMarks', msg);
};

export const getMarksViaCertificate = (data) => {
    console.log(data);
    marksSocket.emit('getMarksViaCertificate', data);
};