export const TYPES = {
  INIT: "PREF_INIT",
  UPDATE: "PREF_UPDATE",
} as const;

export type PreferenceInitProps = {
  themeMode?: string;
};
export type PreferenceUpdateProps = {
  themeMode?: string;
};

export function init(props: PreferenceInitProps) {
  return {
    type: TYPES.INIT,
    props,
  };
};

export function update(props: PreferenceUpdateProps) {
  return {
    type: TYPES.UPDATE,
    props,
  };
};