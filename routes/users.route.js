var express = require('express')
var router = express.Router()

var controller = require('../controllers/users.controller')

router.get('/', controller.list)

router.get('/list', controller.list)

router.get('/create', controller.create)

router.get('/:id', controller.getDetail)

router.post('/create', controller.postCreate)

router.post('/delete', controller.delete)

module.exports = router