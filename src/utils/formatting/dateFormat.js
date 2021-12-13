const dateFormat = (string) => {
  let options = { year: "numeric", month: "numeric", day: "numeric" };
  return new Date(string).toLocaleDateString([], options);
}

export default dateFormat;