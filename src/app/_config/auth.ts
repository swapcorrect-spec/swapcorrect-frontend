import { jwtDecode, type JwtPayload } from "jwt-decode";

export interface IUserDecoded extends JwtPayload {
  user_id: string;
  email: string;
  fullname: string;
  phone: string;
  token_type: "access" | "refresh";
}

const AuthLocalStorageObject = {
  access: "comms-access-token",
  refresh: "comms-refresh-token",
  session_id: "comms-session_id",
};

export class Auth {
  static setToken(token: string) {
    localStorage.setItem(AuthLocalStorageObject.access, token);
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(AuthLocalStorageObject.refresh, token);
  }

  static setSessionToken(session_id: string) {
    localStorage.setItem(AuthLocalStorageObject.session_id, session_id);
  }

  static getToken() {
    return localStorage.getItem(AuthLocalStorageObject.access);
  }

  static getRefreshToken() {
    return localStorage.getItem(AuthLocalStorageObject.refresh);
  }

  static getSessionToken() {
    return localStorage.getItem(AuthLocalStorageObject.session_id);
  }

  static getDecodedJwt(tkn = "") {
    try {
      const token = this.getToken();
      const t = token || tkn;
      const decoded = jwtDecode<IUserDecoded>(t);
      return decoded;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e: unknown) {
      return {} as IUserDecoded;
    }
  }

  static isAuthenticated() {
    try {
      const decodedToken = this.getDecodedJwt();
      // if (!isEmpty(decodedToken)) {
        // const { exp } = decodedToken;
        // const currentTime = Date.now() / 1000;
        // if (exp) {
        //   return exp > currentTime;
        // }
        // return true;
      // }
      // return false;
      console.log(decodedToken, 'decode')
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      return false;
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static removeToken() {
    localStorage.clear();
  }
}
