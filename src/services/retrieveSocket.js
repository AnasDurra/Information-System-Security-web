import { io } from 'socket.io-client';

export const getSocket = io(URL + '/get', {
  autoConnect: false,
});

export const getSocketGetTeacherSubjects = (token) => {
  completeInfoSocket.emit('getTeacherSubjects', token);
};

export const getSocketGetAllStudents = (token) => {
  completeInfoSocket.emit('getAllStudents', token);
};

export const getSocketGetAllDescriptions = (token) => {
  completeInfoSocket.emit('getAllDescriptions', token);
};
