import { combineReducers } from "redux";
import { employerReducer } from "./employer";
import { jobSeekerReducer } from "./jobSeeker";
import { loginReducer } from "./login";

const rootReducer = combineReducers({
  employer: employerReducer,
  jobseeker: jobSeekerReducer,
  login: loginReducer,
});

export default rootReducer;
