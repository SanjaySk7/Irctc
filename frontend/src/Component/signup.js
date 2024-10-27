import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postsOnSignup } from "./signUp-Slice";
import "../App.css";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const {loading,  error, success } = useSelector((state) => state.signup);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    dispatch(postsOnSignup(formData)); // Dispatch the action to trigger saga
  };

  if (success) {
    navigate("/login"); // Redirect on successful signup
  }

  return (
    <div className="signup-container">
      <div className="signup-heading">
        <h3>Sign Up</h3>
      </div>
      <form onSubmit={handleSubmit} className="signup-form">
        <label>Name: </label>
        <input
          name="name"
          type="text"
          value={formData.name}
          onChange={handleChange}
        />

        <label>Email: </label>
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
        />

        <label>Password: </label>
        <input
          name="password"
          type="password"
          value={formData.password}
          onChange={handleChange}
        />

        <button type="submit" disabled={loading}>
          Sign Up
        </button>
        {error && <p className="error-message">{error}</p>}
      </form>
    </div>
  );
};

export default Signup;