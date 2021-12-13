export default (map, value) => {
  const mapList = Object.keys(map);
  return mapList.find(x => map[x] === value);
}