const Comment = require('../models/Comment')

const updateComment = async(req, res)=>{
    try{
        const comment = await Comment.findByIdAndUpdate(req.params.id, {$set:req.body}, {new:true})
        res.status(200).json(comment)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteComment = async(req, res)=>{
    try{
        await Comment.findByIdAndDelete(req.params.id)
        res.status(200).json("delete success")
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const createComment = async(req, res)=>{
    try{
        const comment = await Comment.create(req.body)
        res.status(200).json(comment)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const getPostComments = async(req, res)=>{
    try{
        const comments = await Comment.find({post_id:req.params.post_id})
        res.status(200).json(comments)
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

module.exports = {updateComment, deleteComment, createComment, getPostComments}