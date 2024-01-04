import { createContext, useContext, useState } from 'react';

const PasswordContext = createContext();

export const PasswordProvider = ({ children }) => {
  const [password, setPassword] = useState(null);

  return <PasswordContext.Provider value={{ password, setPassword }}>{children}</PasswordContext.Provider>;
};

export const usePassword = () => {
  return useContext(PasswordContext);
};