import CryptoJS from 'crypto-js';

export const encrypt = (message, secretKey, iv) => {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const ivBytes = CryptoJS.enc.Utf8.parse(iv);
    const encrypted = CryptoJS.AES.encrypt(message, key, {
        iv: ivBytes,
        mode: CryptoJS.mode.CFB,
    });
    return encrypted.toString();
};

export const decrypt = (encryptedMessage, secretKey, iv) => {
    const key = CryptoJS.enc.Utf8.parse(secretKey);
    const ivBytes = CryptoJS.enc.Utf8.parse(iv);
    const decrypted = CryptoJS.AES.decrypt(encryptedMessage, key, {
        iv: ivBytes,
        mode: CryptoJS.mode.CFB,
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
};
