export const TYPES = {
  UPDATE_CONTENT: "UPDATE_CONTENT",
} as const;

export type FormContentNotificationProps = {
  complete_order: string;
  fail_order: string;
}

export function update(props: FormContentNotificationProps) {
  return {
    type: TYPES.UPDATE_CONTENT,
    props
  }
}

