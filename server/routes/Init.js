var express = require('express');
var router = express.Router();
var init = require('../controllers/Init')

// http://localhost:8080/init
router.put('/init', init.init)

module.exports = router;
