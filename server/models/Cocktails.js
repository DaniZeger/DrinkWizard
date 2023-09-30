const mongoose = require('mongoose')

const CocktailsSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    imageUrl: {
        type: String
    },
    imageAlt: {
        type: String
    },
    ingredients: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId },
            amount: { type: String },
            ingredient: { type: String, require: true }
        }
    ],
    preparation: {
        type: String,
        require: true
    },
    garnish: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now()
    }
})

const CocktailsModel = mongoose.model('CocktailsModel', CocktailsSchema, 'cocktails')

module.exports = CocktailsModel