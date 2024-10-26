import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../App.css'; // Import the CSS file

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:8081/irctc', formData);
            console.log(res.data);
            navigate('/login');
        } catch (err) {
            console.error("Error during form submission:", err);
            setError("Failed to register. Please try again.");
        }
    };

    return (
        <div className="signup-container">
            <div className='signup-heading'><h3>SignUP</h3></div>
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
                
                <button type="submit">Sign Up</button>
                {error && <p className="error-message">{error}</p>}
            </form>
        </div>
    );
};

export default Signup;
