import { combineReducers } from "redux";
import Layout, { LayoutState } from "./layout/reducers";
import Preference, { PreferenceState } from "./preference/reducers";
import Session, { SessionState } from "./session/reducers";
import Filter, { FilterState } from "./filter/reducers";
import Models, { ModelsState } from "./models/reducers";
import TrackingId , { FormTrackingState }from "./trackingid/reducers";
import UpLoadFile , { FormUpLoadFileState }from "./uploadfile/reducers";
import ContentNotification , { FormcontentState }from "./contentnotification/reducers";

export type RootState = {
  Layout: LayoutState,
  Preference: PreferenceState,
  Session: SessionState,
  Filter: FilterState,
  Models: ModelsState,
  TrackingId : FormTrackingState,
  UpLoadFile :FormUpLoadFileState,
  ContentNotification :FormcontentState
};

export const Reducers = combineReducers({
  Layout,
  Preference,
  Session,
  Filter,
  Models,
  TrackingId,
  UpLoadFile,
  ContentNotification
});
