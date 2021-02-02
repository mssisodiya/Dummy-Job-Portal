import { combineReducers } from "redux";
import { employerReducer } from "./employer";
import { jobSeekerReducer } from "./jobSeeker";
import { jobPostReducer } from "./jobPost";
import { loginReducer } from "./login";
import { jobAppliedReducer } from "./appliedjobs";

const rootReducer = combineReducers({
  employer: employerReducer,
  jobseeker: jobSeekerReducer,
  jobpost: jobPostReducer,
  jobapplied: jobAppliedReducer,
  login: loginReducer,
});

export default rootReducer;
