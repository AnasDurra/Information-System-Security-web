import { createContext, useContext, useState } from 'react';

const SubjectContext = createContext();

export const SubjectProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);

  const setAllSubjects = (newSubjects) => {
    setSubjects(newSubjects);
  };

  return <SubjectContext.Provider value={{ subjects, setAllSubjects }}>{children}</SubjectContext.Provider>;
};

export const useSubjects = () => {
  return useContext(SubjectContext);
};
