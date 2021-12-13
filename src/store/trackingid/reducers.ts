import { TYPES } from "./actions";
import { PropAction } from "../props";


export type FormTrackingState = {
  idTracking: string;
  weight: number;
};

const initial_state: FormTrackingState = {
  idTracking: "",
  weight: 0,
}

export default (state: FormTrackingState = initial_state, actions: PropAction) => {
  switch (actions.type) {
    case TYPES.UPDATE_FORM:
      const trackingIdForm = {
        idTracking: actions.props.idTracking,
        weight: 
          actions.props.weight === "" ? 0 : parseInt(actions.props.weight.replace(/,/g, ''),10),
      }
      state = trackingIdForm
      return state;
    default:
      return state;
  }
}