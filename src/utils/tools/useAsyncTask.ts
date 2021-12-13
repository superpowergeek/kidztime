import { LoadingTask } from "store/layout/reducers";
import { RootState } from "store/reducers";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Paths } from "../constants";
import { useRouter } from "./index";
import { useSnackbar } from "notistack";
import { Actions } from "store";
import useStatefulTask, { Runnable } from "../useStatefulTask";

export type ErrorCatcher = (error: any) => any;

const parseError = (original: any) => {
  let error = original;
  if (original.isAxiosError) {
    if (original.response) {
      if (original.response.data && original.response.data.error)
        error = original.response.data.error;
      error.axios = {
        request: original.request,
        response: original.response,
        config: original.config,
      };
    }
  }
  return error;
};

export default (taskname: string, errorCatcher?: ErrorCatcher) => {
  const [error, setError] = useState(null);
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const loadingTasks = useSelector<RootState, { [index: string]: LoadingTask }>((store) => store.Layout.loadingTasks);

  const cleanup = () => {
    setError(null);
    if (errorCatcher) errorCatcher(null);
  };
  const statefulTask = useStatefulTask(taskname);
  const _errorCatcher = errorCatcher || console.error;
  const asyncTaskRunner = async (task: Runnable) => {
    if (typeof cleanup === "function") cleanup();
    try {
      await statefulTask(task);
    } catch (rawError) {
      const error = parseError(rawError);
      if (error.message === "unauthorised:token expired") {
        dispatch(Actions.Session.logout());
        router.history.push(Paths.Auth.Login);
        enqueueSnackbar("Session expired. Please login again to continue!", { variant: "error" });
      }
      setError(error);
      _errorCatcher(error);
    }
  };
  const loadingState = !!loadingTasks[taskname];
  return [asyncTaskRunner, loadingState, error, setError];
};
