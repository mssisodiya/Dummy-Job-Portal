import { combineReducers } from "redux";
import { employerReducer } from "./employer";
import { jobSeekerReducer } from "./jobSeeker";

const rootReducer = combineReducers({
  employer: employerReducer,
  jobseeker: jobSeekerReducer,
});

export default rootReducer;
