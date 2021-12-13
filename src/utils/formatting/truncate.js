export default function (string, length) {
  return string.length <= length ? string : string.slice(0, length) + "...";
}