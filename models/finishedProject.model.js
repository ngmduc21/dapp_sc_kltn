const mongoose = require('mongoose');

const fprojectSchema = new mongoose.Schema({
    name: String,
    client: String,
    leader: String,
    numberOfMembers: String,
    budget: Number,
    listMembers: Array,
    date: Date,
})

module.exports = mongoose.model('fproject', fprojectSchema)