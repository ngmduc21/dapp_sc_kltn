var express = require('express')
var router = express.Router()

var controller = require('../controllers/project.controller')
const { route } = require('./dashboard.route')

router.get('/', controller.index)

router.get('/list', controller.list)

router.get('/create', controller.createList)

router.get('/:id', controller.getDetail)

router.get('/finish/:id', controller.finish)

router.get('/addMembers/:id', controller.addMembers)

router.post('/addToProject', controller.addToProject)

router.post('/create', controller.postcreate)

router.post('/finish', controller.postFinish)

router.post('/delete', controller.delete)

router.post('/searchLeader', controller.searchLeader)

router.post('/searchMembers', controller.searchMembers)

router.get("/task/:id", controller.taskManager)

module.exports = router