import React, { ReactElement, SetStateAction, useState } from "react";
import type { Dispatch } from "react";

type AuthContextProviderProps = {
  children: ReactElement;
};

type AuthContextState = {
  currentUser: any;
  setCurrentUser: Dispatch<SetStateAction<any>>;
  isFetchingUserData: boolean;
  setIsFetchingUserData: (isFetchingUserData: boolean) => void;
};

const defaultContextValue = {} as AuthContextState;

export const AuthContext = React.createContext(defaultContextValue);

export const AuthProvider: React.FC<AuthContextProviderProps> = ({
  children,
}) => {
  const [currentUser, setCurrentUser] = useState();
  const [isFetchingUserData, setIsFetchingUserData] = useState(true);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        isFetchingUserData,
        setIsFetchingUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
