import React, { useState } from "react";
import { useSelector } from "react-redux"; // Import to access Redux state
import Admin from "../Pages/Admin/index";
import User from "../Pages/Users/index";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Access signup data from Redux
  const signupData = useSelector((state) => state.signup.users); // Update path if necessary

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
console.log(formData);

    // Define admin credentials
    const adminEmail = "admin@gmail.com";
    const adminPassword = "a123";
console.log(signupData);

    // Check for admin credentials
    if (formData.email === adminEmail && formData.password === adminPassword) {
      setIsAuthenticated(true);
      setIsAdmin(true);
    } else if (signupData) {
      console.log("user");
      
      // Look for matching email and password in the signup data
      const user = signupData.find(
        (user) =>
          user.email === formData.email && user.password === formData.password
      );

      // Authenticate general users if a match is found
      if (user) {
        setIsAuthenticated(true);
        setIsAdmin(false);
      } else {
        alert("Invalid login details");
      }
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

  // Render either Admin or User component based on isAdmin status
  return isAdmin ? <Admin /> : <User />;
};

export default Login;
