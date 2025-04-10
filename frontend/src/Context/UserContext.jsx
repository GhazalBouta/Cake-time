import { createContext, useState } from 'react';

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [userState, setUserState] = useState({});

  return (
    <UserContext.Provider value={{ userState, setUserState }}>
      {children}
    </UserContext.Provider>
  );
};