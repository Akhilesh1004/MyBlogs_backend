const express = require('express')
const { createComment, updateComment, deleteComment, getPostComments } = require('../controllers/commentController')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

router.post('/create', requireAuth, createComment)

router.put('/:id', requireAuth, updateComment)

router.delete('/:id', requireAuth, deleteComment)

router.get('/post/:post_id', getPostComments)

module.exports = router