const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors());
app.use(express.json());

//can replace with MongoDB Atlas connection string if for cloud hosting. currently local.
mongoose.connect('mongodb://localhost:27017/paymentsDB', { useNewUrlParser: true, useUnifiedTopology: true });

// Models for Customer and Transactions
const User = require('./models/User');
const Transaction = require('./models/Transaction');

// Register route with password hashing
app.post('/register', async (req, res) => {
    const { fullName, idNumber, accountNumber, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, idNumber, accountNumber, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
});

// Login route with JWT token generation
app.post('/login', async (req, res) => {
    const { accountNumber, password } = req.body;
    const user = await User.findOne({ accountNumber });
    if (!user) return res.status(400).json({ error: 'User not found' });

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) return res.status(400).json({ error: 'Invalid password' });

    const token = jwt.sign({ userId: user._id }, 'secret_key');
    res.json({ token });
});

// Payment submission
app.post('/submit-payment', async (req, res) => {
    const { amount, currency, recipientAccount, swiftCode } = req.body;
    const newTransaction = new Transaction({ amount, currency, recipientAccount, swiftCode });
    await newTransaction.save();
    res.json({ message: 'Payment submitted' });
});


//To start the server
app.listen(5000, () => console.log('Server running on port 5000'));