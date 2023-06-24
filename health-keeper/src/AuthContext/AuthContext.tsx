import React, { ReactElement, useState } from 'react';

type AuthContextProviderProps = {
    children: ReactElement;

}

type AuthContextState = {
    currentUser: {
      email: string;
    },
    setCurrentUser: (currentUser: {email: string}) => void
}

const defaultContextValue = {} as AuthContextState


export const AuthContext = React.createContext(defaultContextValue);


export const AuthProvider: React.FC<AuthContextProviderProps> = ({children}) => {

  const [currentUser, setCurrentUser] = useState({email: ''});

  return <AuthContext.Provider value={{currentUser, setCurrentUser}}>{children}</AuthContext.Provider>;
};


