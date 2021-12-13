export const TYPES = {
  OPEN_MODEL_UPLOAD: "OPEN_MODEL_UPLOAD",
  CLOSE_MODEL_UPLOAD: "CLOSE_MODEL_UPLOAD"
} as const;


export function openFormUploadFile() {
  return {
    type: TYPES.OPEN_MODEL_UPLOAD,
  }
}

export function closeFormUploadFile() {
  return {
    type: TYPES.CLOSE_MODEL_UPLOAD,
  }
}


