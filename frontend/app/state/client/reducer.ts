'use client';
import { Action, AuthStateActionType, IAuthState } from './type';

type TokenType = string | null | undefined;

export const AuthReducer = (
  state: IAuthState,
  action: Action<TokenType, AuthStateActionType>
): IAuthState => {
  const { payload, type } = action;

  switch (type) {
    case AuthStateActionType.SET_TOKEN:
      return { ...state, token: payload as TokenType };
    default:
      return state;
  }
};
