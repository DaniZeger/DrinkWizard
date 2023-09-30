const PostModel = require('../models/Post')
const UserModel = require('../models/User')
const joi = require('joi')

module.exports = {
    addLikedPost: async function (req, res, next) {
        try {
            const schema = joi.object({
                user_id: joi.string().required(),
                post_id: joi.string().required()
            })

            const { error, value } = schema.validate({ user_id: req.params.userId, post_id: req.params.postId })

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const user = await UserModel.findById(value.user_id)
            const alreadyLiked = user.liked_posts.some((likedPost) => likedPost.post_id.toString() === value.post_id)
            if (alreadyLiked) {
                return res.status(400).json({ error: 'Post already liked by the user' });
            }

            const post = await PostModel.findById(value.post_id)
            user.liked_posts.push({
                post_id: post._id,
                title: post.title,
                subtitle: post.subtitle
            })

            const updateUser = await user.save()

            res.json(updateUser)
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    },

    removeLikedPost: async function (req, res, next) {
        try {
            const schema = joi.object({
                user_id: joi.string().required(),
                post_id: joi.string().required()
            })

            const { error, value } = schema.validate({ user_id: req.params.userId, post_id: req.params.postId })

            if (error) {
                console.log(error.details[0].message);
                res.status(400).json({ error: "invalid data" });
                return;
            }

            const user = await UserModel.findById(value.user_id)

            const likedPostIndex = user.liked_posts.findIndex(
                (likedPost) => likedPost.post_id.toString() === req.params.postId
            );
            if (likedPostIndex === -1) {
                return res.status(404).json({ error: 'Post not found in user\'s liked posts' });
            }

            user.liked_posts.splice(likedPostIndex, 1);

            const updatedUser = await user.save();
            res.json(updatedUser);
        } catch (err) {
            console.error(err);
            res.status(500).json({ error: err });
        }
    }
}