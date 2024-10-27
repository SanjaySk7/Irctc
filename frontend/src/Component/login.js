import React, { useState } from "react";
import Admin from "../Pages/Admin/index";
import User from "../Pages/Users/index";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Simple login handler
  const handleLogin = (e) => {
    e.preventDefault();

    // Define admin credentials
    const adminEmail = "admin@example.com";
    const adminPassword = "adminpass";

    // Check for admin credentials
    if (formData.email === adminEmail && formData.password === adminPassword) {
      setIsAuthenticated(true);
      setIsAdmin(true);
    }
    // Check for general user credentials
    else if (formData.email && formData.password) {
      setIsAuthenticated(true);
      setIsAdmin(false);
    } else {
      alert("Invalid login details");
    }
  };

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div>
        <h3>Login</h3>
        <form onSubmit={handleLogin}>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              required
            />
          </label>
          <br />
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }

  return isAdmin ? <Admin /> : <User />;
};

export default Login;