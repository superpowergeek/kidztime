export const TYPES = {
  ADD_BACKGROUND_LOADING: "ADD_BACKGROUND_LOADING",
  REMOVE_BACKGROUND_LOADING: "REMOVE_BACKGROUND_LOADING",
  UPDATE_GLOBAL_SHOW: "UPDATE_GLOBAL_SHOW",
} as const;

export type AddBackgroundLoadingProps = {
  name: string;
  uuid: string;
};
export type RemoveBackgroundLoadingProps = {
  uuid: string;
};
export type UpdateGlobalShowProps = {
  key: string;
  show?: boolean;
};

export function addBackgroundLoading(props: AddBackgroundLoadingProps) {
  return {
    type: TYPES.ADD_BACKGROUND_LOADING,
    props,
  };
};

export function removeBackgroundLoading(props: RemoveBackgroundLoadingProps) {
  return {
    type: TYPES.REMOVE_BACKGROUND_LOADING,
    props,
  };
};

export function updateGlobalShow(props: UpdateGlobalShowProps) {
  return {
    type: TYPES.UPDATE_GLOBAL_SHOW,
    props,
  };
};
