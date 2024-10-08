import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Login = () => {
    const [formData, setFormData] = useState({ accountNumber: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Login successful');
            navigate('/payment'); // Redirect to payment page
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Account Number" value={formData.accountNumber} 
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} required />
            <input type="password" placeholder="Password" value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <button type="submit">Login</button>
        </form>
    );
};

export default Login;