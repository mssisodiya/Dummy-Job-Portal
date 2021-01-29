import { combineReducers } from "redux";
import { employerReducer } from "./employer";
import { jobSeekerReducer } from "./jobSeeker";
import { jobPostReducer } from "./jobPost";
import { loginReducer } from "./login";

const rootReducer = combineReducers({
  employer: employerReducer,
  jobseeker: jobSeekerReducer,
  jobpost: jobPostReducer,
  login: loginReducer,
});

export default rootReducer;
