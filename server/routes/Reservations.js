const express = require('express')
const router = express.Router()
const Reservations = require("../controllers/Reservations")

// http://localhost:8080/reservations
router.get('/', Reservations.getAll)
router.post('/', Reservations.addOne)

module.exports = router;

