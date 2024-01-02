import CryptoJS from 'crypto-js';
// import keypair from 'keypair';
// import signer from 'nacl-signature';
import forge from 'node-forge';

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

export const generateRSAKeyPair = () => {
  const { privateKey, publicKey } = forge.pki.rsa.generateKeyPair({ bits: 2048 });

  const publicKeyPem = forge.pki.publicKeyToPem(publicKey);

  const privateKeyPem = forge.pki.privateKeyToPem(privateKey);

  return { publicKey, privateKey, publicKeyPem, privateKeyPem };
};

export const signData = (data, privateKey) => {
  const md = forge.md.sha256.create();
  md.update(data, 'utf8');
  const signature = privateKey.sign(md);

  const encodedSignature = forge.util.encode64(signature);

  return encodedSignature;
};

const verifyMessage = (message, signature, publicKey) => {
  const md = forge.md.sha256.create();
  md.update(message, 'utf8');
  const verified = publicKey.verify(md.digest().getBytes(), forge.util.decode64(signature));

  return verified;
};
