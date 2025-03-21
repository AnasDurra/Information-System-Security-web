import {io} from "socket.io-client";
import {URL} from "./constants.js";

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