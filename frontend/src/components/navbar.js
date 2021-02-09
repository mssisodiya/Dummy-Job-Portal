import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/login";
import { connect } from "react-redux";

const NavBar = () => {
  const checker = useSelector((state) => state.login.data);
  const dispatch = useDispatch();

  const logoutuser = async () => {
    localStorage.clear();
    {
      !localStorage.user && window.location.replace("/");
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      {console.log("checker", checker)}
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <div className="navbar-nav">
          {!checker && (
            <ul className="nav nav-pills">
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  SignUp
                </span>

                <div className="dropdown-menu">
                  <NavLink className="dropdown-item" to="/register/employer">
                    Employer
                  </NavLink>
                  <NavLink className="dropdown-item" to="/register/jobseeker">
                    JobSeeker
                  </NavLink>
                </div>
              </li>
              <li className="nav-item dropdown">
                <span
                  className="nav-link dropdown-toggle"
                  data-toggle="dropdown"
                  role="button"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  Login
                </span>

                <div className="dropdown-menu">
                  <NavLink className="dropdown-item" to="/Elogin">
                    Employer
                  </NavLink>
                  <NavLink className="dropdown-item" to="/Jlogin">
                    I am a JobSeeker
                  </NavLink>
                </div>
              </li>
            </ul>
          )}

          {checker && checker.user.role == "1" && (
            <React.Fragment>
              <NavLink className="navbar-brand" to="/ehome">
                Home
              </NavLink>
              <NavLink className="nav-link" to={`/new/jobpost`}>
                NewJob
              </NavLink>
              <NavLink className="nav-link" to="/applications">
                Applications
              </NavLink>
              <NavLink className="nav-link" onClick={logoutuser} to="/">
                Logout
              </NavLink>
            </React.Fragment>
          )}

          {checker && checker.user.role == "2" && (
            <React.Fragment>
              <NavLink className="navbar-brand" to="/jhome">
                Home
              </NavLink>
              <NavLink
                className="nav-link"
                to={`/appliedJobs/${checker.user._id}`}
              >
                Myjobs
              </NavLink>
              <NavLink className="nav-link" onClick={logoutuser} to="/">
                Logout
              </NavLink>
            </React.Fragment>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = (state) => ({
  users: state.login,
});

export default connect(mapStateToProps)(NavBar);
