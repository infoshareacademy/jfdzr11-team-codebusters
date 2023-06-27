import React, { ReactElement, useState } from 'react';


type AuthContextProviderProps = {
  children: ReactElement;
};

type AuthContextState = {
  currentUser: {
    email: string;
  };
  setCurrentUser: (currentUser: { email: string }) => void;
  isFetchingUserData: boolean;
  setIsFetchingUserData: (isFetchingUserData: boolean) => void;
};

const defaultContextValue = {} as AuthContextState;

export const AuthContext = React.createContext(defaultContextValue);

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState({ email: '' });
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isFetchingUserData,
        setIsFetchingUserData,
      }}>
      {children}
    </AuthContext.Provider>
  );
};
