/* import { io } from 'socket.io-client';
import { encrypt } from './encryption';
import Cookies from 'js-cookie';
import { generateIV } from './sockests';

//TODO global url
const URL = 'https://university-server-backend-service.onrender.com';
export const getSocket = io(URL + '/getSocket', {
  autoConnect: false,
});

export const getSocketGetTeacherSubjects = (token) => {
  console.log('hiiiiiiiii');
  console.log(getSocket.connected);
  getSocket.connect();
  console.log('tok: ', token);
  getSocket.emit('getTeacherSubjects', { access_token: token });
};

export const getSocketGetAllStudents = (token) => {
  getSocket.emit('getStudents', { access_token: token });
};

export const getSocketGetAllDescriptions = (token) => {
  getSocket.emit('getAllDescriptions', token);
};
 */