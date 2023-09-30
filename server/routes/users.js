var express = require('express');
var router = express.Router();
const users = require('../controllers/Users')

// http://localhost:8080/users/sign-up
router.post('/sign-up', users.signUp)

// http://localhost:8080/users/log-in
router.post('/log-in', users.login);


module.exports = router;
