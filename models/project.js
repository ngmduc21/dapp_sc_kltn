const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    client: String,
    members: String,
    budget: String,
    listMembers: Array,
})

module.exports = mongoose.model('project', projectSchema)