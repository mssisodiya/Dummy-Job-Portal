import { Route, Switch } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import ELogin from "./components/employer/Login";
import JLogin from "./components/jobSeeker/Login";
import NavBar from "./components/navbar";
import Signup from "./components/jobSeeker/signup";
import EHome from "././components/employer/Home";
import SignUpE from "./components/employer/signup";
import Home from "./components/home";
import JobPost from "./components/employer/postJob";
import EditJob from "./components/employer/editjob";
import JHome from "./components/jobSeeker/Home";
import ApplyJob from "./components/jobSeeker/applyJob";
import notfound from "./notfound";
import EmpRoute from "./EmpRoutes.js";
import JobSRoute from "./JobSeekRoutes";
import { ToastContainer } from "react-toastify";
import Applications from "./components/employer/applications";
import ViewAppl from "./components/employer/viewApplication";
import AppliedJobs from "./components/jobSeeker/appliedjobs";
import getCurrentUser from "./components/auth";
import { useSelector } from "react-redux";

const App = () => {
  const checker = useSelector((state) => state.login.data);
  const user = getCurrentUser();
  return (
    <div className="App">
      <ToastContainer />
      <NavBar />
      <main className="container">
        <Switch>
          {!user ? (
            <Route exact path="/" component={Home} />
          ) : (
            <Route exact path="/" component={notfound} />
          )}

          <Route exact path="/register/jobseeker" component={Signup} />
          <Route path="/register/employer" component={SignUpE} />

          <EmpRoute path="/new/jobpost" component={JobPost} />
          <EmpRoute path="/editjob/:id" component={EditJob} />
          <EmpRoute path="/ehome" component={EHome} />
          <EmpRoute path="/applications" component={Applications} />
          <EmpRoute path="/viewapplication/:id" component={ViewAppl} />
          <Route path="/Elogin" component={ELogin} />

          <JobSRoute path="/jhome" component={JHome} />
          <JobSRoute path="/apply/:id" component={ApplyJob} />
          <JobSRoute path="/appliedJobs/:id" component={AppliedJobs} />
          <Route path="/Jlogin" component={JLogin} />

          <Route exact path="/notfound" component={notfound} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
