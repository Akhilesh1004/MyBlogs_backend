const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        required:false,
    },
    post_id:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    }
}, {timestamps:true})

CommentSchema.statics.deleteuser = async function (id) {
    await this.deleteMany({user_id:id})
};



module.exports = mongoose.model('Comment', CommentSchema)