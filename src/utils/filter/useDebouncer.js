import { useRef , useState } from "react";

export default (func, wait) => {
  const timeoutID = useRef();
  const [init, setInit] = useState(false);
  return (...args) => {
    if (timeoutID.current) {
    clearTimeout(timeoutID.current);
    };
    timeoutID.current = setTimeout(() => {
    if (!init) setInit(true);
    func(...args);
    }, !init ? 0: wait);
  }
}