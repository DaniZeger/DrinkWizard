const express = require('express')
const router = express.Router()
const cocktails = require('../controllers/Cocktails')

// http://localhost:8080/cocktails
router.get('/', cocktails.getAll)
router.post('/', cocktails.addCocktail)

// http://localhost:8080/cocktails/:id
router.get('/:id', cocktails.getOne)
router.put('/:id', cocktails.editCocktail)
router.delete('/:id', cocktails.deleteCocktail)

module.exports = router