import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { addEmployer } from "../../actions/employer";

function SignUpE(props) {
  const dispatch = useDispatch();
  const [newCompany, setCompany] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    password: "",
    role: "",
  });

  function handleChange({ currentTarget: input }) {
    const data = { ...newCompany };
    data[input.name] = input.value;
    setCompany(data);
  }
  const handleSubmit = () => {
    newCompany.role = 1;
    dispatch(addEmployer(newCompany));
    props.history.push("/login");
  };

  return (
    <div id="registerform">
      <h3>Register Your Company</h3>
      <div className="form-group">
        <label>Comapny Name</label>
        <input
          type="text"
          className="form-control"
          placeholder="Enter full Name"
          name="name"
          value={newCompany.name}
          onChange={handleChange}
        />
      </div>

      <div className="form-group">
        <label>Company Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          name="email"
          value={newCompany.email}
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
          value={newCompany.phone}
          placeholder="Enter phone"
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Company Address</label>
        <input
          type="text"
          className="form-control"
          id="address"
          name="address"
          value={newCompany.address}
          placeholder="Enter address"
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
          value={newCompany.password}
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

export default SignUpE;
