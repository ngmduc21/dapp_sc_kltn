const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    client: String,
    leader: String,
    numberOfMembers: String,
    budget: String,
    assigned: String,
    date: Date,
})

module.exports = mongoose.model('project', projectSchema)