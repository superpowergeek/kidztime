import { Actions } from "store";
import { useDispatch } from "react-redux";
import strings from "utils/strings";

export type Runnable = () => any;

export default (taskName = strings.uuidv4()) => {
  const dispatch = useDispatch();
  return async (runnable: Runnable) => {
    if (typeof runnable !== "function") return;
    const taskUuid = strings.uuidv4();
    dispatch(Actions.Layout.addBackgroundLoading({
      name: taskName,
      uuid: taskUuid,
    }));
    try {
      return await runnable();
    } finally {
      dispatch(Actions.Layout.removeBackgroundLoading({
        uuid: taskUuid,
      }));
    }
  };
};
