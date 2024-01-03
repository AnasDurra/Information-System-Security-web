import { createContext, useContext, useState } from 'react';

const CertificateContext = createContext();

export const CertificateProvider = ({ children }) => {
  const [certificate, setCertificate] = useState(null);

  return <CertificateContext.Provider value={{ certificate, setCertificate }}>{children}</CertificateContext.Provider>;
};

export const useCertificate = () => {
  return useContext(CertificateContext);
};
