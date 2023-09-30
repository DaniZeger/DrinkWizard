const express = require('express')
const router = express.Router()
const liked = require('../controllers/Liked')

// http://localhost:8080/user-likes/users/:userId/post/:postId/like
router.post('/user/:userId/post/:postId/like', liked.addLikedPost)

// http://localhost:8080/user-likes/users/:userId/post/:postId/unlike
router.post('/user/:userId/post/:postId/unlike', liked.removeLikedPost)

module.exports = router;