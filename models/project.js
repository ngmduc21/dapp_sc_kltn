const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    name: String,
    client: String,
    members: String,
    budget: String,
})

module.exports = mongoose.model('project', projectSchema)