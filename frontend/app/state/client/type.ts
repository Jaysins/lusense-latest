export interface IAuthState {
  token?: string | null;
  setToken: (token: string | null) => void;
}

export enum AuthStateActionType {
  SET_TOKEN,
}

export interface Action<T, R> {
  payload?: T | null;
  type: R;
}
