const mongoose = require('mongoose');

const finishedProjectSchema = new mongoose.Schema({
    name: String,
    client: String,
    leader: String,
    numberOfMembers: String,
    budget: String,
    listMembers: Array,
})

module.exports = mongoose.model('finishedProject', finishedProjectSchema)