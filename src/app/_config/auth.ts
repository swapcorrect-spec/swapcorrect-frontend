import { jwtDecode } from "jwt-decode";

export interface IDecodedToken {
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress": string;
  "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata": string;
  "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string;
  jti: string;
  exp: number;
  iss: string;
  aud: string;
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

  static mapToken(raw: IDecodedToken) {
    return {
      email: raw["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"],
      jti: raw.jti,
      name: raw["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name"],
      userdata: raw["http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata"],
      role: raw["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"],
      exp: raw.exp,
      iss: raw.iss,
      aud: raw.aud,
    };
  }

  static getDecodedJwt(tkn = "") {
    try {
      const token = this.getToken();
      const t = token || tkn;
      const decoded = jwtDecode<IDecodedToken>(t);
      return decoded;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e: unknown) {
      return {} as IDecodedToken;
    }
  }

  static isAuthenticated() {
    try {
      const decodedToken = this.getDecodedJwt();
      const hasProperties = decodedToken && Object.keys(decodedToken).length > 0;
      if (hasProperties) {
        const { exp } = decodedToken;
        const currentTime = Date.now() / 1000;
        if (exp) {
          return exp > currentTime;
        }
        return true;
      }
      return false;
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
