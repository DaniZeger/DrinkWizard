const ReservationModel = require("../models/Reservations")
const joi = require('joi')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await ReservationModel.find({})
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting reservations' });
        }
    },

    addOne: async function (req, res, next) {
        try {
            const schema = joi.object({
                fullName: joi.string().required(),
                country_code: joi.string().required(),
                phone: joi.string().required(),
                email: joi.string().email().allow(null, ''),
                numberOfPeople: joi.number().required(),
                area: joi.string().allow(null, ''),
                date: joi.date(),
                time: joi.string().required()
            })

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: 'Invalid data' })
            }

            const deleteAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)

            await ReservationModel.createIndexes({ "deleteAt": 1 }, { expireAfterSeconds: 0 })

            const newReservation = new ReservationModel({
                fullName: value.fullName,
                country_code: value.country_code,
                phone: value.phone,
                email: value.email,
                numberOfPeople: value.numberOfPeople,
                area: value.area,
                date: value.date,
                time: value.time,
                deleteAt: deleteAt
            })

            const results = await newReservation.save()
            res.json({
                ...value,
                deleteAt,
                _id: results._id
            })

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add reservation" });
        }
    }
}