const mongoose = require('mongoose');

const assignedSchema = new mongoose.Schema({
    projectID: String,
    projectName: String,
    employeeID: Array,
    performance: Array,
})

module.exports = mongoose.model('assigned', assignedSchema)