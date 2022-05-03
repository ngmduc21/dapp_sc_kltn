var express = require('express')
var router = express.Router()

var controller = require('../controllers/project.controller')

router.get('/', controller.index)

router.get('/list', controller.list)

router.get('/create', controller.create)

router.get('/:id', controller.getDetail)

router.get('/finish/:id', controller.finish)

router.post('/create', controller.postcreate)

module.exports = router