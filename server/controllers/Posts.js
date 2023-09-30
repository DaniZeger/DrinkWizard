const PostModel = require('../models/Post')
const joi = require('joi')

module.exports = {
    getAll: async function (req, res, next) {
        try {
            const result = await PostModel.find({})
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting posts' });
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

            const result = await PostModel.findOne({ _id: value._id });

            if (!result) {
                res.status(404).json({ error: "post not found" });
                return;
            }
            res.json(result);

        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the post" });
        }
    },

    addPost: async function (req, res, next) {
        try {
            const schema = joi.object({
                title: joi.string().required().min(2),
                subtitle: joi.string().allow(null, ''),
                text: joi.string().required().min(2),
                imageUrl: joi.string().allow(null, ''),
                imageAlt: joi.string().allow(null, ''),
                author: joi.string().allow(null, '')
            })
            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: 'Invalid data' })
            }

            const newPost = new PostModel({
                title: value.title,
                subtitle: value.subtitle,
                text: value.text,
                imageUrl: value.imageUrl,
                imageAlt: value.imageAlt,
                author: value.author
            })

            const result = await newPost.save()
            res.json({
                ...value,
                _id: result._id
            })
        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add post" });
        }
    },

    editLikes: async function (req, res, next) {
        try {
            const scheme = joi.object({
                likes: joi.number(),
                dislikes: joi.number(),
            });

            const { error, value } = scheme.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const post = await PostModel.findOneAndUpdate({
                _id: req.params.id
            }, value)

            if (!post) return res.status(404).send('Given ID was not found.');

            const updated = await PostModel.findOne({ _id: req.params.id });
            res.json(updated);
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ error: "error update post" });
        }
    },

    editPost: async function (req, res, next) {
        try {
            const schema = joi.object({
                title: joi.string().required().min(2),
                subtitle: joi.string().allow(null, ''),
                text: joi.string().required().min(2),
                imageUrl: joi.string().allow(null, ''),
                imageAlt: joi.string().allow(null, ''),
                updated_at: joi.date()
            })

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const post = await PostModel.findOneAndUpdate({
                _id: req.params.id
            }, value)

            if (!post) return res.status(404).send('Given ID was not found.');

            const updated = await PostModel.findOne({ _id: req.params.id });
            res.json(updated);

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error add post" });
        }
    },

    deletePost: async function (req, res, next) {
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

            const deleted = await PostModel.findOne({ _id: value._id });

            await PostModel.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete post" });
        }
    },
}
