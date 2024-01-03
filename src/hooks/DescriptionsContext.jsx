import { createContext, useContext, useState } from 'react';

const DescriptionContext = createContext();

export const DescriptionProvider = ({ children }) => {
  const [descriptions, setDescriptions] = useState([]);

  const setAllDescriptions = (newDescriptions) => {
    setDescriptions(newDescriptions);
  };

  return (
    <DescriptionContext.Provider value={{ descriptions, setAllDescriptions }}>{children}</DescriptionContext.Provider>
  );
};

export const useDescriptions = () => {
  return useContext(DescriptionContext);
};
