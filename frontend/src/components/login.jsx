import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../actions/login";

function Login(props) {
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
    dispatch(login(user))
      .then((res) => {
        localStorage.setItem("token", res.token);
        res.user.role === 1 ? history.push("/ehome") : history.push("/jhome");
      })
      .catch((e) => {
        toast.error("Email or password are invalid");
      });
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
