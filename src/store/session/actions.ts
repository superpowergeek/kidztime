import { Moment } from "moment";

export const TYPES = {
  LOGIN: "SESSION_LOGIN",
  LOGOUT: "SESSION_LOGOUT",
  LAST_ROUTE: "SESSION_LAST_ROUTE",
  PROFILE: "SESSION_PROFILE"
} as const;

export type SessionLoginProps = {
  token: string;
  expires_at: Moment;
};

export type SessionProfileProps = {
  user: any;
};

export type LastRouteProps = {
  lastRoute: string;
};

export function login(props: SessionLoginProps) {
  return {
    type: TYPES.LOGIN,
    props,
  };
};

export function profile(props: SessionProfileProps) {
  return {
    type: TYPES.PROFILE,
    props,
  };
};

export function lastRoute(props: LastRouteProps) {
  return {
    type: TYPES.LAST_ROUTE,
    props,
  };
};

export function logout() {
  return {
    type: TYPES.LOGOUT,
  };
};