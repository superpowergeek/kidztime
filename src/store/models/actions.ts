export const TYPES = {
  UPDATE: "MODELS_UPDATE",
} as const;


export type ModelsUpdateProps = {
  key: any;
  value: any;
}

export function update(props: ModelsUpdateProps) {
  return {
    type: TYPES.UPDATE,
    props
  }
}