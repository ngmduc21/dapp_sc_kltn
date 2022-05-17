var express = require('express')
var router = express.Router()

var controller = require('../controllers/transfer.controller')

router.get('/', controller.index)

module.exports = router