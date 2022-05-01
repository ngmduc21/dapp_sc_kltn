var express = require('express')
var router = express.Router()

var controller = require('../controllers/project.controller')

router.get('/', controller.index)

router.get('/list', controller.list)

router.get('/create', controller.create)

module.exports = router