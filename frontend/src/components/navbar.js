import { NavLink } from "react-router-dom";

export default function NavBar() {
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
          <ul className="nav nav-pills">
            <li className="nav-item dropdown">
              <NavLink
                className="nav-link dropdown-toggle"
                data-toggle="dropdown"
                to="/"
                role="button"
                aria-haspopup="true"
                aria-expanded="false"
              >
                SignUp
              </NavLink>
              <div className="dropdown-menu">
                <NavLink className="dropdown-item" to="/register/employer">
                  Employer
                </NavLink>
                <NavLink className="dropdown-item" to="/register/jobseeker">
                  JobSeeker
                </NavLink>
              </div>
            </li>
          </ul>
          <NavLink className="nav-link" to="/login">
            Login
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
