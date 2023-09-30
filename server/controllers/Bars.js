const BarModel = require('../models/Bars')
const joi = require('joi')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await BarModel.find({})
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting bars' });
        }
    },

    getOne: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const result = await BarModel.findOne({ _id: value._id });

            if (!result) {
                res.status(404).json({ error: "bar not found" });
                return;
            }

            res.json(result);

        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the bar" });
        }
    },

    addBar: async function (req, res, next) {
        try {
            const schema = joi.object({
                barName: joi.string().required(),
                description: joi.string().allow(null, ''),
                country_code: joi.string().required(),
                phone: joi.string().required(),
                email: joi.string().email().allow(null, ''),
                address: joi.string().required(),
                website: joi.string().allow(null, ''),
                mainImageUrl: joi.string().allow(null, ''),
                mainImageAlt: joi.string().allow(null, ''),
                gallery: joi.array().items({
                    imageUrl: joi.string().allow(null, ''),
                    imageAlt: joi.string().allow(null, '')
                })
            })
            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: 'Invalid data' })
            }

            const newBar = new BarModel({
                barName: value.barName,
                description: value.description,
                country_code: value.country_code,
                phone: value.phone,
                email: value.email,
                address: value.address,
                website: value.website,
                mainImageUrl: value.mainImageUrl,
                mainImageAlt: value.mainImageAlt,
                gallery: value.gallery
            })

            const result = await newBar.save()
            res.json({
                ...value,
                _id: result._id
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add bar" });
        }
    },

    rateBar: async function (req, res, next) {
        try {
            const scheme = joi.object({
                rating: joi.number().required()
            });

            const { error, value } = scheme.validate(req.body);
            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const bar = await BarModel.findById({ _id: req.params.id });

            bar.rating.push(value.rating);
            await bar.save();

            res.json({ message: 'Rating added successfully' });

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error update bar" });
        }
    },

    editBar: async function (req, res, next) {
        try {
            const schema = joi.object({
                barName: joi.string().required(),
                description: joi.string().allow(null, ''),
                country_code: joi.string().required(),
                phone: joi.string().required(),
                email: joi.string().email().allow(null, ''),
                address: joi.string().required(),
                website: joi.string().allow(null, ''),
                mainImageUrl: joi.string().allow(null, ''),
                mainImageAlt: joi.string().allow(null, ''),
                gallery: joi.array().items({
                    _id: joi.string().required(),
                    imageUrl: joi.string().allow(null, ''),
                    imageAlt: joi.string().allow(null, '')
                })
            })
            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const bar = await BarModel.findOneAndUpdate({
                _id: req.params.id
            }, value)

            if (!bar) return res.status(404).send('Given ID was not found.');

            const updated = await BarModel.findOne({ _id: req.params.id });
            res.json(updated);

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error edit bar" });
        }
    },

    deleteBar: async function (req, res, next) {
        try {
            const scheme = joi.object({
                _id: joi.string().required(),
            });

            const { error, value } = scheme.validate({ _id: req.params.id });

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const deleted = await BarModel.findOne({ _id: value._id });

            await BarModel.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete bar" });
        }
    },
}