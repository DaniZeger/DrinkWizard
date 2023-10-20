const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const UserModel = require('../models/User');
const joi = require('joi');
const config = require('../config/dev')

module.exports = {

    getAll: async function (req, res, next) {
        try {
            const result = await UserModel.find({})
            res.json(result);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: 'error getting users' });
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

            const result = await UserModel.findOne({ _id: value._id });

            if (!result) {
                res.status(404).json({ error: "user not found" });
                return;
            }
            res.json(result);

        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error get the post" });
        }
    },

    editUser: async function (req, res, next) {
        try {
            const schema = joi.object({
                firstName: joi.string().required().min(2),
                lastName: joi.string().required().min(2),
                email: joi.string().email().required(),
                country_code: joi.string().allow(null, ''),
                phone: joi.string().allow(null, ''),
                address: joi.string().allow(null, ''),
                isAdmin: joi.boolean(),
                password: joi.string().min(6).max(255).required(),
            })

            const { error, value } = schema.validate(req.body);

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const user = await UserModel.findOneAndUpdate({
                _id: req.params.id
            }, value)

            if (!user) res.status(404).send('Given ID was not found.')

            const updated = await UserModel.findOne({ _id: req.params.id })
            res.json(updated)

        } catch (err) {
            console.log(err);
            res.status(400).json({ error: "error edit user" });
        }


    },

    deleteUser: async function (req, res, next) {
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

            const deleted = await UserModel.findOne({ _id: value._id });

            await UserModel.deleteOne(value).exec();
            res.json(deleted);
        }
        catch (err) {
            console.log(err);
            res.status(400).json({ error: "error delete user" });
        }
    },

    login: async function (req, res, next) {

        const schema = joi.object({
            email: joi.string().required().min(6).max(256).email(),
            password: joi.string().required().min(6).max(1024),
        });

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(401).send('User does not exist');
            return;
        }

        try {
            const user = await UserModel.findOne({ email: value.email });
            if (!user) throw Error;
            const validPassword = await bcrypt.compare(value.password, user.password);
            if (!validPassword) throw 'Invalid password';

            const param = { email: value.email };
            const token = jwt.sign(param, config.jwt_token, { expiresIn: '72800s' });

            res.json({
                token: token,
                _id: user._id,
                email: user.email,
                firstName: user.firstName,
                lastName: user.lastName,
                isAdmin: user.isAdmin,
                liked_posts: user.liked_posts
            });
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    },

    signUp: async function (req, res, next) {
        const schema = joi.object({
            firstName: joi.string().required().min(2),
            lastName: joi.string().required().min(2),
            email: joi.string().email().required(),
            country_code: joi.string().allow(null, ''),
            phone: joi.string().allow(null, ''),
            address: joi.string().allow(null, ''),
            isAdmin: joi.boolean(),
            password: joi.string().min(6).max(15).required(),
        })

        const { error, value } = schema.validate(req.body);

        if (error) {
            console.log(error.details[0].message);
            res.status(400).json({ error: 'error sign up new user' });
            return;
        }

        try {
            const user = await UserModel.findOne({ email: value.email });
            if (user) {
                return res.status(400).json({ error: "User already registered." });
            }

            const hash = await bcrypt.hash(value.password, 10);

            const newUser = new UserModel({
                firstName: value.firstName,
                lastName: value.lastName,
                email: value.email,
                country_code: value.country_code,
                phone: value.phone,
                address: value.address,
                isAdmin: value.isAdmin,
                password: hash,
            })

            await newUser.save();
            res.json(newUser)
        }
        catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    }
}