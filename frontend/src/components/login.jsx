import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { login } from "../actions/login";

function Login(props) {
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
    dispatch(login(user)).then((res) => localStorage.setItem("token", res));
    props.history.push("/ehome");
  };

  return (
    <div id="registerform">
      <h3>Login</h3>

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

export default Login;
