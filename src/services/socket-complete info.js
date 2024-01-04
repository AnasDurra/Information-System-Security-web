import {io} from "socket.io-client";
import {URL} from "./constants.js";
import bcrypt from "bcryptjs";
import {encrypt} from "./encryption.js";
import {generateIV} from "./encryption.js";

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