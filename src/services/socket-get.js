import {io} from "socket.io-client";
import {URL} from "./constants.js";

export const getSocket = io(URL + '/getSocket', {
    autoConnect: false,
});

export const requestGetTeacherSubjects = async (data) => {
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