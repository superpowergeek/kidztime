import moment, { Moment } from "moment";
import { StorageKeys } from "utils/constants";
import { PropAction } from "../props";
import { LastRouteProps, SessionLoginProps, SessionProfileProps, TYPES } from "./actions";

export type JwtClaims = {
  iss?: string,
  exp: number,
  sub: string,
  iat?: number,
  scp?: string,
  aet?: string,
};

const sessionJson = localStorage.getItem(StorageKeys.Session);
let savedJson = sessionJson ? JSON.parse(sessionJson) : null;

let claims;
try {
  const components = savedJson.split(".");
  const body = components[1]; // [header, body, signature]
  claims = JSON.parse(atob(body));
} catch (err) {
  console.error(err);
  savedJson = null;
}

export type SessionState = {
  token: any;
  expires_at: Moment | null;
  lastRoute: string;
  user: any;
};
const initial_state: SessionState = savedJson ? {
  token: savedJson,
  expires_at: moment(claims?.exp, "X"),
  lastRoute: "",
  user: null,
} : {
    token: null,
    expires_at: null,
    lastRoute: "",
    user: null,
  };

const saveSessionData = (token: string) => {
  if (!token) return;

  localStorage.setItem(StorageKeys.Session, JSON.stringify(token));
}

const removeSessionData = () => {
  if (localStorage.getItem(StorageKeys.Session)) {
    localStorage.removeItem(StorageKeys.Session);
  }
};

export default (state: SessionState = initial_state, actions: PropAction) => {
  switch (actions.type) {
    case TYPES.LOGIN:
      const loginProps: SessionLoginProps = actions.props;
      saveSessionData(loginProps.token);
      return {
        ...state,
        token: loginProps.token,
        expires_at: loginProps.expires_at,
      };
    case TYPES.LAST_ROUTE:
      const lastRouteProps: LastRouteProps = actions.props;
      return {
        ...state,
        lastRoute: lastRouteProps.lastRoute,
      }
    case TYPES.PROFILE:
      const profileProps: SessionProfileProps = actions.props;
      return {
        ...state,
        user: profileProps.user
      }
    case TYPES.LOGOUT:
      removeSessionData();
      return {
        ...state,
        token: null,
        user: null,
        expires_at: null,
      };
    default:
      return state;
  }
};
