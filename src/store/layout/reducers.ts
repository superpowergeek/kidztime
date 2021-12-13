import moment, { Moment } from "moment";
import { PropAction } from "../props";
import { TYPES, AddBackgroundLoadingProps, RemoveBackgroundLoadingProps, UpdateGlobalShowProps } from "./actions";

export type LayoutState = {
  loadingTasks: { [index: string]: LoadingTask };
  tasksRegistry: { [index: string]: string };
  globalShow: { [index: string]: boolean };
};

export type LoadingTask = {
  [index: string]: Moment;
};

const initial_state: LayoutState = {
  loadingTasks: {},
  tasksRegistry: {},
  globalShow: {},
};

export default (state: LayoutState = initial_state, actions: PropAction) => {
  let loadingTask: LoadingTask | null = null, taskName;
  switch (actions.type) {
    case TYPES.ADD_BACKGROUND_LOADING:
      const addLoadingProps: AddBackgroundLoadingProps = actions.props;
      loadingTask = state.loadingTasks[addLoadingProps.name] || {};
      loadingTask[addLoadingProps.uuid] = moment();
      state.tasksRegistry[addLoadingProps.uuid] = addLoadingProps.name;
      return {
        ...state,
        loadingTasks: {
          ...state.loadingTasks,
          [addLoadingProps.name]: loadingTask,
        },
        tasksRegistry: {
          ...state.tasksRegistry,
        },
      };
    case TYPES.REMOVE_BACKGROUND_LOADING:
      const removeLoadingProps: RemoveBackgroundLoadingProps = actions.props;
      taskName = state.tasksRegistry[removeLoadingProps.uuid];
      if (!taskName) return state;
      loadingTask = state.loadingTasks[taskName];
      if (!loadingTask || !loadingTask[removeLoadingProps.uuid]) return state;

      delete loadingTask[removeLoadingProps.uuid];
      if (!Object.keys(loadingTask).length)
        delete state.loadingTasks[taskName];
      delete state.tasksRegistry[removeLoadingProps.uuid];
      return {
        ...state,
        loadingTasks: {
          ...state.loadingTasks,
        },
        tasksRegistry: {
          ...state.tasksRegistry,
        },
      };
    case TYPES.UPDATE_GLOBAL_SHOW:
      const updateGlobalProps: UpdateGlobalShowProps = actions.props;
      const key = updateGlobalProps.key;
      const show = updateGlobalProps.show === undefined ?
        !state.globalShow[key] : updateGlobalProps.show === true;
      return {
        ...state,
        globalShow: {
          ...state.globalShow,
          [key]: show,
        }
      };
    default:
      return state;
  }
};
