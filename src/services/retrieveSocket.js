import { io } from 'socket.io-client';

//TODO global url
const URL = 'https://university-server-backend-service.onrender.com';
export const getSocket = io(URL + '/get', {
  autoConnect: false,
});

export const getSocketGetTeacherSubjects = (token) => {
  getSocket.emit('getTeacherSubjects', token);
};

export const getSocketGetAllStudents = (token) => {
  getSocket.emit('getAllStudents', token);
};

export const getSocketGetAllDescriptions = (token) => {
  getSocket.emit('getAllDescriptions', token);
};
