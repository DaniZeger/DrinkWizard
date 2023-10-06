const express = require('express')
const router = express.Router()
const posts = require('../controllers/Posts')

// http://localhost:8080/posts
router.post('/', posts.addPost)
router.get('/', posts.getAll)

// http://localhost:8080/posts/:id
router.get('/:id', posts.getOne)
router.put('/:id', posts.editPost)
router.delete('/:id', posts.deletePost)

// http://localhost:8080/posts/:id/like-dislike
router.put('/like-dislike/:id', posts.editLikes)

module.exports = router;