import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate  } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({ fullName: '', idNumber: '', accountNumber: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/register', formData);
            alert('Registration successful');
            navigate('/payment'); // Redirect to payment page
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Full Name" value={formData.fullName} 
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
            <input type="text" placeholder="ID Number" value={formData.idNumber} 
                onChange={(e) => setFormData({ ...formData, idNumber: e.target.value })} required />
            <input type="text" placeholder="Account Number" value={formData.accountNumber} 
                onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} required />
            <input type="password" placeholder="Password" value={formData.password} 
                onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
            <button type="submit">Register</button>
        </form>
    );
};

export default Register;