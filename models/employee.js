const mongoose = require('mongoose');
const employeeSchema = new mongoose.Schema({
    email: String,
    fullName: String,
    employeeID: String,
    phone: String,
    isPaid: Boolean, 
    walletAddress: String,
    date: Date,
});

module.exports = mongoose.model('employee', employeeSchema);