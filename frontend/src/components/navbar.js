import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/login";
import getCurrentUser from "./auth";

export default function NavBar(props) {
  const user = useSelector((state) => state.login.isAuthenticated);
  localStorage.setItem("isLoggedIn", user);

  const log = localStorage.getItem("isLoggedIn");
  const dispatch = useDispatch();
  const [token, setToken] = useState("");

  function logoutuser() {
    dispatch(logout());
    localStorage.clear();
    window.location.replace("/");
  }

  useEffect(() => {
    setToken(localStorage.getItem("user"));
    //   setUser(getCurrentUser());
  }, [setToken]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
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
          {!user && !token ? (
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
                    I am a Employer
                  </NavLink>
                  <NavLink className="dropdown-item" to="/Jlogin">
                    I am a JobSeeker
                  </NavLink>
                </div>
              </li>
            </ul>
          ) : (
            <NavLink
              to="/login"
              onClick={() => logoutuser()}
              className="nav-link"
            >
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
