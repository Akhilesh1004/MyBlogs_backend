const express = require('express')
const { createPost, updatePost, deletePost, getPost, getPosts, getUserPosts} = require('../controllers/postController')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

router.post('/create', requireAuth, createPost)

router.put('/:id', requireAuth, updatePost)

router.delete('/:id', requireAuth, deletePost)

router.get('/:id', getPost)

router.get('/', getPosts)

router.get('/user/:user_id', getUserPosts)

module.exports=router