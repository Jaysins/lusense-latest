"use client";
import { createContext, useContext } from "react";

import { IAuthState } from "./type";

export const DefaultAuthState: IAuthState = {
  setToken: () => null,
  token: null,
};

export const AuthContext = createContext<IAuthState>(DefaultAuthState);

export const useAuthContext = () => useContext(AuthContext);
