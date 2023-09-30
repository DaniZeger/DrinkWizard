const CocktailModel = require('../models/Cocktails')
const joi = require('joi')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await CocktailModel.find({})
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting cocktails' });
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

            const result = await CocktailModel.findOne({ _id: value._id });

            if (!result) {
                res.status(404).json({ error: "Cocktail not found" });
                return;
            }

            res.json(result);

        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the cocktail" });
        }
    },

    addCocktail: async function (req, res, next) {
        try {
            const schema = joi.object({
                title: joi.string().required(),
                description: joi.string().allow(null, ''),
                imageUrl: joi.string().allow(null, ''),
                imageAlt: joi.string().allow(null, ''),
                ingredients: joi.array().items({
                    amount: joi.string().allow(null, ''),
                    ingredient: joi.string().required()
                }),
                preparation: joi.string().required(),
                garnish: joi.string().allow(null, ''),
            })

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: 'Invalid data' })
            }

            const newCocktail = new CocktailModel({
                title: value.title,
                description: value.description,
                imageUrl: value.imageUrl,
                imageAlt: value.imageAlt,
                ingredients: value.ingredients,
                preparation: value.preparation,
                garnish: value.garnish,
            })

            const result = await newCocktail.save()
            res.json({
                ...value,
                _id: result._id
            })

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the cocktail" });
        }
    },

    editCocktail: async function (req, res, next) {
        try {
            const schema = joi.object({
                title: joi.string().required(),
                description: joi.string().allow(null, ''),
                imageUrl: joi.string().allow(null, ''),
                imageAlt: joi.string().allow(null, ''),
                ingredients: joi.array().items({
                    amount: joi.string().allow(null, ''),
                    ingredient: joi.string().required()
                }),
                preparation: joi.string().required(),
                garnish: joi.string().allow(null, ''),
            })

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const cocktail = await CocktailModel.findOneAndUpdate({
                _id: req.params.id
            }, value)

            if (!cocktail) return res.status(404).send('Given ID was not found.');

            const updated = await CocktailModel.findOne({ _id: req.params.id });
            res.json(updated);

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error edit cocktail" });
        }
    },

    deleteCocktail: async function (req, res, next) {
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

            const deleted = await CocktailModel.findOne({ _id: value._id });

            await CocktailModel.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete cocktail" });
        }
    },
}