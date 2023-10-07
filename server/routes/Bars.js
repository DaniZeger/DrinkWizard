const express = require('express')
const router = express.Router()
const bars = require('../controllers/Bars')

// http://localhost:8080/bars
router.get('/', bars.getAll)
router.post('/', bars.addBar)

// http://localhost:8080/bars/:id
router.get('/:id', bars.getOne)
router.put('/:id', bars.editBar)
router.delete('/:id', bars.deleteBar)

// http://localhost:8080/bars/:id/rate
router.post('/rate/:id', bars.rateBar)

module.exports = router;
