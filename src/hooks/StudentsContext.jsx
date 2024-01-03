import { createContext, useContext, useState } from 'react';

const StudentContext = createContext();

export const StudentProvider = ({ children }) => {
  const [students, setStudents] = useState([]);

  const setAllStudents = (newStudents) => {
    setStudents(newStudents);
  };

  return <StudentContext.Provider value={{ students, setAllStudents }}>{children}</StudentContext.Provider>;
};

export const useStudents = () => {
  return useContext(StudentContext);
};
