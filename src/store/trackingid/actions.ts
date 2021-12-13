export const TYPES = {
  UPDATE_FORM: "UPDATE_FORM",
} as const;

export type FormTrackingUpdateProps = {
  idTracking: string;
  weight: string;
}

export function update(props: FormTrackingUpdateProps) {
  return {
    type: TYPES.UPDATE_FORM,
    props
  }
}

