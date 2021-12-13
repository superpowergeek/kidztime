import { StorageKeys, ThemeModes } from "utils/constants";
import { PropAction } from "../props";
import { TYPES, PreferenceUpdateProps } from "./actions";

export type PreferenceState = {
  themeMode: "dark" | "light",
};

const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
const savedThemePreference = localStorage.getItem(StorageKeys.Theme);
const initialTheme = savedThemePreference || (prefersDarkMode ? "dark" : "light");

const initial_state: PreferenceState = {
  themeMode: Object.values(ThemeModes).includes(initialTheme) ? (initialTheme as "dark" | "light") : "light",
};

const checkToSaveThemePreference = (currentTheme: string, updatePayload: PreferenceUpdateProps) => {
  const { themeMode } = updatePayload;
  if (!themeMode) return;

  if (themeMode !== currentTheme && Object.values(ThemeModes).includes(themeMode))
    localStorage.setItem(StorageKeys.Theme, themeMode);
};

export default (state: PreferenceState = initial_state, actions: PropAction) => {
  ;
  switch (actions.type) {
    case TYPES.INIT:
      return {
        ...state,
        ...actions.props,
      };
    case TYPES.UPDATE:
      checkToSaveThemePreference(state.themeMode, actions.props);
      return {
        ...state,
        ...actions.props,
      };
    default:
      return state;
  }
};
