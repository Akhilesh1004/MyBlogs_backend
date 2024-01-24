const User = require('../models/User')
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const jwt = require('jsonwebtoken')

const createToken = (_id, username, email) =>{
    return jwt.sign({_id:_id, username:username, email:email}, process.env.SECRET, {expiresIn:'3d'})
}

const signupUser = async(req, res) =>{
    const {username, email, password} = req.body
    try{
        const user = await User.signup(username, email, password)
        const token = createToken(user._id, user.username, user.email)
        res.cookie("token", token, { httpOnly: true, secure: true }).status(200).json({username, email, token})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const loginUser = async(req, res) =>{
    const {email, password} = req.body
    try{
        const user = await User.login(email, password)
        const token = createToken(user._id, user.username, user.email)
        let _id = user._id
        res.cookie("token", token).status(200).json({username:user.username, email, token, _id})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const logoutUser = async(req, res) =>{
    try{
        res.clearCookie("token", {sameSite:"none", secure:true}).status(200).send("User logout success")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const refetchUser = async(req, res) =>{
    try{
        const token = req.cookies.token
        const data = jwt.verify(token, process.env.SECRET)
        res.status(200).json(data)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const updateUser = async(req, res)=>{
    try{
        const user = await User.update(req.params.id, req.body)
        if(req.body.username){
            await Post.updateMany({ user_id: req.params.id }, { $set: { username: req.body.username } })
            await Comment.updateMany({ user_id: req.params.id }, { $set: { author: req.body.username } })
        }
        res.status(200).json(user)
    }catch(error){
        res.status(500).json({error: error.message})
    }
}

const deleteUser = async(req, res)=>{
    try{
        await User.deleteuser(req.params.id)
        await Post.deleteuser(req.params.id)
        await Comment.deleteuser(req.params.id)
        res.clearCookie("token", {sameSite:"none", secure:true}).status(200).send("delete success")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getUser = async(req, res)=>{
    try{
        const user = await User.getuser(req.params.id)
        const {username, email, _id} = user
        res.status(200).json({username, email, _id})
    }catch(error){
        //console.log(error)
        res.status(400).json({error: error.message})
    }
}

module.exports = {signupUser, loginUser, updateUser, deleteUser, getUser, logoutUser, refetchUser}
