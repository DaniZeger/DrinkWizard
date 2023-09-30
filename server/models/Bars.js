const mongoose = require('mongoose')

const BarSchema = new mongoose.Schema({
    barName: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    country_code: {
        type: String,
        require: true
    },
    phone: {
        type: String,
        require: true
    },
    email: {
        type: String,
        default: ""
    },
    address: {
        type: String,
        require: true
    },
    website: {
        type: String,
        default: ""
    },
    mainImageUrl: {
        type: String,
        default: ''
    },
    mainImageAlt: {
        type: String,
        default: ''
    },
    gallery: [
        {
            _id: { type: mongoose.Schema.Types.ObjectId },
            imageUrl: { type: String },
            imageAlt: { type: String },
        }
    ],
    rating: [
        {
            type: Number,
            min: 1,
            max: 5
        }
    ],
    created_at: {
        type: Date,
        default: Date.now()
    },
})

BarSchema.virtual('averageRating').get(function () {
    if (this.ratings.length === 0) return 0;
    const sum = this.ratings.reduce((total, rating) => total + rating, 0);
    return sum / this.ratings.length;
});

const BarsModel = mongoose.model('BarModel', BarSchema, 'bars')

module.exports = BarsModel