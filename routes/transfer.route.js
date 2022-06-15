var express = require('express')
var router = express.Router()

var controller = require('../controllers/transfer.controller')

router.get('/', controller.index)

router.get('/exchange', controller.exchange)

router.get('/reward', controller.reward)

router.post('/searchEmployee', controller.searchEmployee)

router.post('/checkAmount', controller.checkAmount)

module.exports = router