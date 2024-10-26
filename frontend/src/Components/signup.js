import React, { useState } from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });

    const navigate=useNavigate

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post('http://localhost:8081/irctc', formData)
        .then(res => {
            console.log(res);
            navigate('/login')
        })
        console.log("Form Data Submitted:", formData);
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
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
            </form>
        </div>
    );
};

export default Signup;
