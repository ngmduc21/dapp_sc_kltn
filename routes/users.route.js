var express = require('express')
var router = express.Router()

var controller = require('../controllers/users.controller')

router.get('/', controller.index)

router.get('/list', controller.list)

router.get('/create', controller.create)

router.post('/create', controller.postCreate);

module.exports = router