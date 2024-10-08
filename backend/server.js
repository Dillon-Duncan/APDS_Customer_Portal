const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Sample data structure for storing users (replace with a database in production)
let users = [];

app.get('/', (req, res) => {
    res.send('Welcome to the Customer International Payments Portal API');
});

// Registration endpoint
app.post('/register', async (req, res) => {
    const { fullName, idNumber, accountNumber, password } = req.body;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user data
    users.push({
        fullName,
        idNumber,
        accountNumber,
        password: hashedPassword,
    });

    res.status(201).json({ message: 'User registered successfully' });
});

// Login endpoint
app.post('/login', async (req, res) => {
    const { accountNumber, password } = req.body;
    const user = users.find(u => u.accountNumber === accountNumber);

    if (user && await bcrypt.compare(password, user.password)) {
        // Create a token
        const token = jwt.sign({ accountNumber: user.accountNumber }, 'secret_key', { expiresIn: '1h' });
        res.json({ token });
    } else {
        res.status(400).json({ message: 'Invalid credentials' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});