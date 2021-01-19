import { Route, Switch } from "react-router-dom";
import "./App.css";
import Login from "./components/login";
import NavBar from "./components/navbar";
import Signup from "./components/jobSeeker/signup";
import EHome from "././components/employer/Home";
import SignUpE from "./components/employer/signup";
import Home from "./components/home";
import PrivateRoute from "./routes.js";
import JobPost from "./components/employer/postJob";
import EditJob from "./components/employer/editjob";
function App() {
  return (
    <div className="App">
      <NavBar />
      <main className="container">
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/register/jobseeker" exact component={Signup} />
          <Route path="/register/employer" exact component={SignUpE} />
          <Route path="/login" exact component={Login} />
          <PrivateRoute path="/new/jobpost/:id" exact component={JobPost} />
          <PrivateRoute path="/editjob/:id" exact component={EditJob} />
          <PrivateRoute path="/ehome" exact component={EHome} />
        </Switch>
      </main>
    </div>
  );
}

export default App;
