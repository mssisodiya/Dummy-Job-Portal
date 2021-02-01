import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../actions/login";
import getCurrentUser from "./auth";

export default function NavBar(props) {
  const user = useSelector((state) => state.login);
  const dispatch = useDispatch();

  function logoutuser() {
    dispatch(logout());
    localStorage.removeItem("token");
    window.location.replace("/login");
  }

  // useEffect(() => {
  //   // token = localStorage.getItem("token");
  //   setUser(getCurrentUser());
  // }, [getCurrentUser]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <NavLink className="navbar-brand" to="/">
        Jobs
      </NavLink>
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
          {!user.token ? (
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
              <li>
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            </ul>
          ) : (
            <NavLink to="/" onClick={() => logoutuser()} className="nav-link">
              Logout
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}
