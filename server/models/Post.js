const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true,
        minlength: 2,
        maxlength: 255
    },
    subtitle: {
        type: String,
    },
    text: {
        type: String,
        require: true,
        minlength: 2,

    },
    imageUrl: {
        type: String,
    },
    imageAlt: {
        type: String,
    },
    likes: {
        type: Number,
        default: 0
    },
    dislikes: {
        type: Number,
        default: 0
    },
    author: {
        type: String,
        require: true,
        default: 'Daniel Zegerson'
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    }
})

const PostModel = mongoose.model('PostModel', PostSchema, 'posts')

module.exports = PostModel