import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { elogin } from "../../actions/login";

function ELogin(props) {
  const history = useHistory();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  function handleChange({ currentTarget: input }) {
    const data = { ...user };
    data[input.name] = input.value;
    setUser(data);
  }
  const handleSubmit = () => {
    dispatch(elogin(user))
      .then((res) => {
        localStorage.setItem("token", res.token);
        history.push("/ehome");
      })
      .catch((e) => {
        toast.error(e.response.data);
      });
  };

  return (
    <div id="registerform">
      <h2>
        <center className="align-center">Welcome Employer</center>
      </h2>

      <h4>Login</h4>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={user.email}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={user.password}
          onChange={handleChange}
          minLength="8"
        />
      </div>

      <button
        onClick={() => handleSubmit()}
        className="btn btn-primary btn-block"
      >
        Login
      </button>
    </div>
  );
}

export default ELogin;
