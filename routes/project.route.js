var express = require('express')
var router = express.Router()

var controller = require('../controllers/project.controller')
const { route } = require('./dashboard.route')

router.get('/', controller.list)

router.get('/list', controller.list)

router.get('/flist', controller.flist)

router.get('/search', controller.search)

router.get('/create', controller.createList)

router.get('/:id', controller.getDetail)

router.get('/finished/:id', controller.getFdetail)

router.get('/finish/:id', controller.finish)

router.get('/createTask/:id', controller.createTask)

router.post('/create', controller.postcreate)

router.post('/wallet', controller.wallet)

router.post('/finish', controller.postFinish)

router.post('/delete', controller.delete)

router.post('/searchEmployee', controller.searchEmployee)

router.post('/createTask', controller.postTask)

module.exports = router