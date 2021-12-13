export const TYPES = {
  UPDATE: "FILTER_UPDATE",
  RELOAD: "FILTER_RELOAD",
} as const;

export type FilterUpdateProps = {
  key: string;
  value: any;
}

export type FilterReloadProps = {
  key: any;
}

export function update(props: FilterUpdateProps) {
  return {
    type: TYPES.UPDATE,
    props
  }
}

export function reload(props: FilterReloadProps) {
  return {
    type: TYPES.RELOAD,
    props
  }
}