const express = require('express')
const { signupUser, loginUser, updateUser, deleteUser, getUser, logoutUser, refetchUser } = require('../controllers/userController')
const router = express.Router()
const requireAuth = require('../middleware/requireAuth')

router.post('/signup', signupUser)

router.post('/login', loginUser)

router.get('/logout', logoutUser)

router.get('/refetch', refetchUser)

router.put('/:id', requireAuth, updateUser)

router.delete('/:id', requireAuth, deleteUser)

router.get('/:id', getUser)

module.exports = router