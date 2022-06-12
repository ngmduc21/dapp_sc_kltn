var express = require('express')
var router = express.Router()

var controller = require('../controllers/admin.controller')

router.get('/', controller.index)


//router.post('/searchEmployee', controller.searchEmployee)

module.exports = router