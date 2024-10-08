import React, { useState } from 'react';
import axios from 'axios';

const Payment = () => {
    const [formData, setFormData] = useState({
        amount: '', currency: '', recipientAccount: '', swiftCode: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:5000/submit-payment', formData, {
                headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Payment submitted');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="number" placeholder="Amount" value={formData.amount} 
                onChange={(e) => setFormData({ ...formData, amount: e.target.value })} required />
            <input type="text" placeholder="Currency" value={formData.currency} 
                onChange={(e) => setFormData({ ...formData, currency: e.target.value })} required />
            <input type="text" placeholder="Recipient Account" value={formData.recipientAccount} 
                onChange={(e) => setFormData({ ...formData, recipientAccount: e.target.value })} required />
            <input type="text" placeholder="SWIFT Code" value={formData.swiftCode} 
                onChange={(e) => setFormData({ ...formData, swiftCode: e.target.value })} required />
            <button type="submit">Pay Now</button>
        </form>
    );
};

export default Payment;