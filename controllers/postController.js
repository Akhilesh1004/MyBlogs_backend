const Post = require('../models/Post')
const Comment = require('../models/Comment')
const { Query } = require('mongoose')

const updatePost = async(req, res)=>{
    try{
        const post = await Post.update(req.params.id, req.body)
        res.status(200).json(post)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deletePost = async(req, res)=>{
    try{
        await Post.deletepost(req.params.id)
        await Comment.deleteMany({post_id:req.params.id})
        res.status(200).json("delete success")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getPost = async(req, res)=>{
    try{
        const post = await Post.getpost(req.params.id)
        res.status(200).json(post)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getPosts = async(req, res)=>{
    try{
        const query = req.query
        
        const filter = {
            $or:[
                {title:{$regex:query.search, $options:'i'}},
                {desc:{$regex:query.search, $options:'i'}}
            ]
        }
        const posts = await Post.find(query.search?filter:null)
        res.status(200).json(posts)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const createPost = async(req, res)=>{
    try{
        const post = await Post.createpost(req.body)
        res.status(200).json(post)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getUserPosts = async(req, res)=>{
    try{
        const posts = await Post.find({user_id:req.params.user_id})
        res.status(200).json(posts)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const searchPosts = async(req, res)=>{
    try{
        const {query} = req.query
        const posts = await Post.find({
            $or:[
                {title:{$regex:query.text, $options:'i'}},
                {desc:{$regex:query.text, $options:'i'}}
            ]
        })
        res.status(200).json(posts)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {updatePost, deletePost, getPost, getPosts, createPost, getUserPosts, searchPosts}