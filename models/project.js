const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    client: String,
    leader: String,
    budget: String,
    listMembers: Array,
})

module.exports = mongoose.model('project', projectSchema)