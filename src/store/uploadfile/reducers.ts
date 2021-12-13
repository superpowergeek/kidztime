import { TYPES } from "./actions";
import { PropAction } from "../props";


export type FormUpLoadFileState = {
  isOpen: boolean
};

const initial_state: FormUpLoadFileState = {
  isOpen: false
}

export default (state: FormUpLoadFileState = initial_state, actions: PropAction) => {
  switch (actions.type) {
    case TYPES.OPEN_MODEL_UPLOAD:
      state.isOpen = true
      return state;
    case TYPES.CLOSE_MODEL_UPLOAD:
      state.isOpen = false
      return state;
    default:
      return state;
  }
}