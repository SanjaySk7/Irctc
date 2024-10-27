import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './Component/login';
import Signup from './Component/signup';
// import './App.css';
// import Admin from './Pages/Admin/index';
// import User from './Pages/Users/index';
// import { Provider } from 'react-redux';
import {Provider} from 'react-redux'
import { store } from './redux/store';

const App = () => {
    const [role, setRole] = useState('');

    const handleRoleToggle = (selectedRole) => {
        setRole(selectedRole);
    };

    return (
      <Provider store={store}>
        <BrowserRouter>
          <div className="app-container">
            <div className="role-toggle-buttons">
              <button
                onClick={() => handleRoleToggle("User")}
                className={
                  role === "User" ? "toggle-button active" : "toggle-button"
                }
              >
                User
              </button>
              <button
                onClick={() => handleRoleToggle("Admin")}
                className={
                  role === "Admin" ? "toggle-button active" : "toggle-button"
                }
              >
                Admin
              </button>
            </div>

            {role && (
              <div className="auth-buttons">
                <button
                  className="auth-button"
                  onClick={() => (window.location.href = "/signup")}
                >
                  Sign Up
                </button>
                <button
                  className="auth-button"
                  onClick={() => (window.location.href = "/login")}
                >
                  Log In
                </button>
              </div>
            )}

            <Routes>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </div>
        </BrowserRouter>
      </Provider>
    );
};

export default App;