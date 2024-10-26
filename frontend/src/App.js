
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './Pages/Admin/index';
import User from './Pages/Users/index';
import { Provider } from 'react-redux';
import { store } from './redux/store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <h1>Welcome To IRCTC!!</h1>
          <Routes>
            <Route path="/admin" element={<Admin />} />
            <Route path="/user" element={<User />} />
          </Routes>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
