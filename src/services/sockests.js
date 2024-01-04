// socket.js
import { io } from 'socket.io-client';
import bcrypt from 'bcryptjs';
import { encrypt, generateRSAKeyPair, signData } from './encryption.js';
import Cookies from 'js-cookie';
import {URL} from './constants.js'













