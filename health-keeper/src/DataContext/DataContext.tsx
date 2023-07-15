import React, { ReactElement,  useState } from 'react';
import { UserData } from './dataTypes';


type DataContextProviderProps = {
    children: ReactElement;
}

type DataContextState = {
  userData: UserData,
  setUserData: (userData: UserData) => void
}

const defaultUserData = {
  loginData: {
    email: ''
  },
  measurements: {},
  medicines: {},
  personalData: {},
  reminders: []
};

const defaultContextValue = {
  setUserData: () => {},
  userData: defaultUserData
} as DataContextState

export const DataContext = React.createContext(defaultContextValue);

export const DataProvider: React.FC<DataContextProviderProps> = ({children}) => {

  const [userData, setUserData] = useState<UserData>(defaultUserData);

  
  return <DataContext.Provider value={{userData, setUserData}}>{children}</DataContext.Provider>;
};

