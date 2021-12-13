import { TYPES } from "./actions";
import { PropAction } from "../props";


export type FormcontentState = {
  complete_order: string;
  fail_order: string;
  no_tracking_id : string;
};

const initial_state: FormcontentState = {
  complete_order : "",
  fail_order: "",
  no_tracking_id : "",
}

export default (state: FormcontentState = initial_state, actions: PropAction) => {
  switch (actions.type) {
    case TYPES.UPDATE_CONTENT:
      return {
        complete_order : actions.props.complete_order,
        fail_order: actions.props.fail_order,
        no_tracking_id: actions.props.no_tracking_id,
      };
    default:
      return state;
  }
}