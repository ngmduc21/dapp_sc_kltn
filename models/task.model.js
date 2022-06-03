const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    project: String,
    employee: String,
    name: String,
    work: String,
})

module.exports = mongoose.model('task', taskSchema)