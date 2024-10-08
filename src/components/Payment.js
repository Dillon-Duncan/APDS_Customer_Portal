import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
  const [formData, setFormData] = useState({ amount: '', currency: '', recipientAccount: '', swiftCode: '' });
  const [error, setError] = useState('');

  const styles = {
    container: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f0f4f8',
    },
    card: {
      backgroundColor: 'white',
      padding: '2rem',
      borderRadius: '10px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      width: '100%',
      maxWidth: '400px',
    },
    header: {
      marginBottom: '1rem',
    },
    title: {
      margin: '0',
      fontSize: '1.5rem',
      textAlign: 'center',
      color: '#2c3e50',
    },
    form: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1rem',
    },
    inputGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    label: {
      marginBottom: '0.5rem',
      color: '#6b7280',
    },
    input: {
      padding: '0.75rem',
      border: '1px solid #ccc',
      borderRadius: '4px',
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
    buttonHover: {
      backgroundColor: '#2563eb',
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await axios.post('http://localhost:5000/submit-payment', formData);
      alert('Payment has been sent for review');
      setFormData({ amount: '', currency: '', recipientAccount: '', swiftCode: '' });
    } catch (err) {
      setError('Payment submission failed. Please try again.');
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Payment</h2>
        </div>
        {error && <div style={styles.error}>{error}</div>}
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label htmlFor="amount" style={styles.label}>Amount</label>
            <input
              id="amount"
              type="number"
              placeholder="Enter amount"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="currency" style={styles.label}>Currency</label>
            <input
              id="currency"
              type="text"
              placeholder="Enter currency"
              value={formData.currency}
              onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.inputGroup}>
            <label htmlFor="recipientAccount" style={styles.label}>Recipient Account</label>
            <input
              id="recipientAccount"
              type="text"
              placeholder="Enter recipient account"
              value={formData.recipientAccount}
              onChange={(e) => setFormData({ ...formData, recipientAccount: e.target.value })}
              style={styles.input}
              required
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
              style={styles.input}
              required
            />
          </div>
          <button
            type="submit"
            style={styles.button}
            onMouseOver={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
            onMouseOut={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
          >
            Submit Payment
          </button>
        </form>
      </div>
    </div>
  );
};

export default Payment;