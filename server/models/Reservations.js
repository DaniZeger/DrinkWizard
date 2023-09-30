const mongoose = require('mongoose')

const ReservationSchema = new mongoose.Schema({
    fullName: {
        type: String,
        require: true
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
    numberOfPeople: {
        type: Number,
        require: true,
        default: 1
    },
    area: {
        type: String,
        default: "Doesn't Matter"
    },
    date: {
        type: Date,
        default: Date.now()
    },
    time: {
        type: String,
        require: true
    },
    deleteAt: {
        type: Date
    }
})

const ReservationModel = mongoose.model('ReservationModel', ReservationSchema, "reservations")

module.exports = ReservationModel