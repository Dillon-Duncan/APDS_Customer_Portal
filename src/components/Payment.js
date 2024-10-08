import React, { useState } from 'react';
import axios from 'axios';

const Payment = ({ onPaymentSuccess = () => { } }) => {
    const [formData, setFormData] = useState({
        amount: '', currency: '', recipientAccount: '', swiftCode: ''
    });
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            await axios.post('http://localhost:5000/submit-payment', formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Payment submitted');
            onPaymentSuccess();
        } catch (error) {
            console.error(error);
            setError('Payment submission failed. Please try again.');
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
            backgroundColor: '#10b981',
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
    };

    return (
        <div style={styles.container}>
            <div style={styles.card}>
                <div style={styles.header}>
                    <h2 style={styles.title}>Payment</h2>
                </div>
                <form onSubmit={handleSubmit} style={styles.form}>
                    <div style={styles.inputGroup}>
                        <label htmlFor="amount" style={styles.label}>Amount</label>
                        <input
                            id="amount"
                            type="number"
                            placeholder="Enter amount"
                            value={formData.amount}
                            onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="currency" style={styles.label}>Currency</label>
                        <input
                            id="currency"
                            type="text"
                            placeholder="Enter currency (e.g., USD)"
                            value={formData.currency}
                            onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="recipientAccount" style={styles.label}>Recipient Account</label>
                        <input
                            id="recipientAccount"
                            type="text"
                            placeholder="Enter recipient account number"
                            value={formData.recipientAccount}
                            onChange={(e) => setFormData({ ...formData, recipientAccount: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    <div style={styles.inputGroup}>
                        <label htmlFor="swiftCode" style={styles.label}>SWIFT Code</label>
                        <input
                            id="swiftCode"
                            type="text"
                            placeholder="Enter SWIFT code"
                            value={formData.swiftCode}
                            onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })}
                            required
                            style={styles.input}
                        />
                    </div>
                    {error && <div style={styles.error}>{error}</div>}
                    <button type="submit" style={styles.button}>Pay Now</button>
                </form>
            </div>
        </div>
    );
};

export default Payment;