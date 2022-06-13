const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    client: String,
    leader: String,
    numberOfMembers: String,
    budget: Number,
    listMembers: Array,
    date: Date,
    status: String,
})

module.exports = mongoose.model('project', projectSchema)