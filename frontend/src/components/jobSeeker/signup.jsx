import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addEmployer } from "../../actions/employer";

function Signup(props) {
  const dispatch = useDispatch();
  const [newUser, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
    password: "",
    role: "",
  });

  function handleChange({ currentTarget: input }) {
    const data = { ...newUser };
    data[input.name] = input.value;
    setUser(data);
  }
  const handleSubmit = () => {
    newUser.role = 2;
    dispatch(addEmployer(newUser));
    props.history.push("/login");
  };

  return (
    <div id="registerform">
      <h3>Sign Up</h3>
      <div className="form-group">
        <label>FullName</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter full Name"
          name="name"
          value={newUser.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={newUser.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Phone</label>
        <input
          type="text"
          className="form-control"
          id="phone"
          name="phone"
          value={newUser.phone}
          placeholder="Enter phone"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Highest Qualification</label>
        <select
          className="custom-select my-1 mr-sm-2"
          id="qualification"
          name="qualification"
          onChange={handleChange}
        >
          <option>Choose...</option>
          <option value="1">BE/BTECH</option>
          <option value="2">MCA</option>
        </select>
      </div>
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          className="form-control"
          placeholder="Enter password"
          name="password"
          value={newUser.password}
          onChange={handleChange}
        />
      </div>

      <button
        onClick={() => handleSubmit()}
        className="btn btn-primary btn-block"
      >
        Sign Up
      </button>
      <p className="forgot-password text-right">
        Already registered <Link to="/login">Log in?</Link>
      </p>
    </div>
  );
}

export default Signup;
