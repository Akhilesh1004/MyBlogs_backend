const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PostSchema = new Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    desc:{
        type:String,
        required:true,
        unique:true
    },
    photo:{
        type:String,
        required:false,
    },
    username:{
        type:String,
        required:true
    },
    user_id:{
        type:String,
        required:true
    },
    categories:{
        type:Array,
        required:false
    }
}, {timestamps:true})


PostSchema.statics.deleteuser = async function (id) {
    await this.deleteMany({user_id:id})
};

PostSchema.statics.deletepost = async function (id) {
    await this.findByIdAndDelete(id)
};

PostSchema.statics.update = async function (id, update) {
    if(!update){
        throw Error('No data can be updated');
    }
    const updateuser = await this.findByIdAndUpdate(id, {$set:update}, {new:true})
    return updateuser;
};

PostSchema.statics.getpost = async function (id) {
    const post = await this.findById(id);
    if(!post){
        throw Error('Post is not exist');
    }
    return post
};


PostSchema.statics.createpost = async function (content) {
    if(!content){
        throw Error('Content must be provided');
    }
    const post = await this.create(content);
    return post;
};

module.exports = mongoose.model('Post', PostSchema)