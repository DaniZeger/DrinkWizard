const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    lastName: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 256,
    },
    email: {
        type: String,
        require: true,
        minlength: 6,
        maxlength: 256,
        unique: true,
    },
    country_code: {
        type: String,
        default: null
    },
    phone: {
        type: String,
        default: null
    },
    address: {
        type: String,
        default: null
    },
    liked_posts: [
        {
            post_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Post' },
            title: { type: String, required: true },
            subtitle: { type: String }
        }
    ],
    isAdmin: {
        type: Boolean,
        default: false
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 255,
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const UserModel = mongoose.model('UserModel', userSchema, 'users');

module.exports = UserModel