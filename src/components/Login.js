import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = ({ onLoginSuccess = () => { } }) => {
    const [formData, setFormData] = useState({ accountNumber: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const response = await axios.post('http://localhost:5000/login', formData);
            localStorage.setItem('token', response.data.token);
            alert('Login successful');
            onLoginSuccess(); 
            navigate('/payment'); 
        } catch (error) {
            console.error(error);
            setError('Login failed. Please check your credentials and try again.');
        }
    };

    const styles = {
        container: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            backgroundColor: '#f3f4f6',
        },
        card: {
            backgroundColor: 'white',
            borderRadius: '8px',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            padding: '2rem',
            width: '100%',
            maxWidth: '400px',
        },
        header: {
            marginBottom: '1.5rem',
            textAlign: 'center',
        },
        title: {
            fontSize: '1.5rem',
            fontWeight: 'bold',
            color: '#1f2937',
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
        },
        inputGroup: {
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
        },
        label: {
            fontSize: '0.875rem',
            fontWeight: '500',
            color: '#4b5563',
        },
        input: {
            padding: '0.5rem',
            borderRadius: '4px',
            border: '1px solid #d1d5db',
            fontSize: '1rem',
        },
        button: {
            padding: '0.75rem',
            backgroundColor: '#3b82f6',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            transition: 'background-color 0.2s',
        },
        error: {
            backgroundColor: '#fee2e2',
            border: '1px solid #ef4444',
            borderRadius: '4px',
            padding: '0.75rem',
            color: '#b91c1c',
            marginBottom: '1rem',
        },
        footer: {
            marginTop: '1rem',
            textAlign: 'center',
            fontSize: '0.875rem',
            color: '#6b7280',
        },
        link: {
            color: '#3b82f6',
            textDecoration: 'none',
        },
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Login</h2>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="accountNumber" style={styles.label}>Account Number</label>
                        <input
                            id="accountNumber"
                            type="text"
                            placeholder="Enter your account number"
                            value={formData.accountNumber}
                            onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="password" style={styles.label}>Password</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    {error && <div style={styles.error}>{error}</div>}
                    <button type="submit" style={styles.button}>Login</button>
                </form>
                <div style={styles.footer}>
                    Don't have an account? <a href="#" style={styles.link}>Register</a>
                </div>
            </div>
        </div>
    );
};

export default Login;