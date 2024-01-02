import forge from 'node-forge';

const generateKeyPairs = async () => {
  const { publicKey, privateKey } = forge.pki.rsa.generateKeyPair({
    bits: 2048,
  });

  const publicPem = forge.pki.publicKeyToPem(publicKey);
  const privatePem = forge.pki.privateKeyToPem(privateKey);

  return Promise.resolve({ publicKey: publicPem, privateKey: privatePem });
};

export default generateKeyPairs;