var express = require('express')
var router = express.Router()

var controller = require('../controllers/project.controller')

router.get('/', controller.list)

router.get('/list', controller.list)

router.get('/create', controller.createList)

router.get('/:id', controller.getDetail)

router.get('/finish/:id', controller.finish)

router.post('/create', controller.postcreate)

router.post('/finish', controller.postFinish)

router.post('/delete', controller.delete)

module.exports = router