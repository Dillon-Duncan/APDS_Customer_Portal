const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    amount: Number,
    currency: String,
    recipientAccount: String,
    swiftCode: String,
    verified: { type: Boolean, default: false }
});

module.exports = mongoose.model('Transaction', TransactionSchema);