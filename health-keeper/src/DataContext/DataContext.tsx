import React, { ReactElement, useState } from 'react';

type DataContextProviderProps = {
    children: ReactElement;
}

type LoginData = {
    email: string,
    password: string,
}

type PersonalData = {
    name?: string,
    lastName?: string,
    birthday?: {
      nanoseconds: number,
      seconds: number,
    };
    address?: string;
    tel?: number;
    PESEL?: number;
    gender?: string;
    email?: string;

}

type UserData = {
    loginData: LoginData,
    personalData: PersonalData,
}

type DataContextState = {
  userData: UserData,
  setUserData: (userData: UserData) => void

}

const defaultContextValue = {} as DataContextState

export const DataContext = React.createContext(defaultContextValue);

export const DataProvider: React.FC<DataContextProviderProps> = ({children}) => {

  const [userData, setUserData] = useState({});

  return <DataContext.Provider value={{userData, setUserData}}>{children}</DataContext.Provider>;
};

