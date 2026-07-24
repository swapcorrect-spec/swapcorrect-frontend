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

type AuthListener = () => void;

const listeners = new Set<AuthListener>();

const notifyAuthListeners = () => {
  listeners.forEach((listener) => listener());
};

export class Auth {
  static subscribe(listener: AuthListener) {
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }

  static setToken(token: string) {
    localStorage.setItem(AuthLocalStorageObject.access, token);
    notifyAuthListeners();
  }

  static setRefreshToken(token: string) {
    localStorage.setItem(AuthLocalStorageObject.refresh, token);
    notifyAuthListeners();
  }

  static setAuthTokens(accessToken: string, refreshToken?: string | null) {
    localStorage.setItem(AuthLocalStorageObject.access, accessToken);
    if (refreshToken) {
      localStorage.setItem(AuthLocalStorageObject.refresh, refreshToken);
    }
    notifyAuthListeners();
  }

  static setSessionToken(session_id: string) {
    localStorage.setItem(AuthLocalStorageObject.session_id, session_id);
    notifyAuthListeners();
  }

  static getToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AuthLocalStorageObject.access);
  }

  static getRefreshToken() {
    if (typeof window === "undefined") return null;
    return localStorage.getItem(AuthLocalStorageObject.refresh);
  }

  static getSessionToken() {
    if (typeof window === "undefined") return null;
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
      const token = this.getToken();
      if (!token) return false;

      const decodedToken = this.getDecodedJwt(token);
      const hasProperties = decodedToken && Object.keys(decodedToken).length > 0;
      if (hasProperties) {
        const { exp } = decodedToken;
        const currentTime = Date.now() / 1000;
        if (exp) {
          // Still treat as authenticated if we have a refresh token to renew with
          if (exp <= currentTime) {
            return !!this.getRefreshToken();
          }
          return true;
        }
        return true;
      }
      return false;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (_e) {
      return false;
    }
  }

  static hasSession() {
    return !!this.getToken() || !!this.getRefreshToken();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static removeToken() {
    localStorage.removeItem(AuthLocalStorageObject.access);
    localStorage.removeItem(AuthLocalStorageObject.refresh);
    localStorage.removeItem(AuthLocalStorageObject.session_id);
    notifyAuthListeners();
  }
}
