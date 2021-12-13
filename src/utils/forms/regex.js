export function getHandle(value) {
  return value.toLowerCase().replace(/[^\-a-zA-Z0-9.]+/g, "-").replace(/[.]/g, "");
}