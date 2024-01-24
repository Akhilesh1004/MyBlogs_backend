const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt')
const validator = require('validator');

const UserSchema = new Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
    }
}, {timestamps:true})

UserSchema.statics.signup = async function (username, email, password) {
    if(!email || !password || !username){
        throw Error('All fields must be filled');
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid');
    }
    if (!validator.isStrongPassword(password)){
        throw Error('Password not strong enough');
    }
    const exists = await this.findOne({email});
    if(exists){
        throw Error('Email already in use');
    }
    const exist = await this.findOne({username})
    if(exist){
        throw Error('Username already in use')
    }

    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const user = await this.create({username, email, password: hash});
    return user;
};

UserSchema.statics.login = async function(email, password) {
    if(!email || !password){
        throw Error('All fields must be filled');
    }
    const user = await this.findOne({email});
    if(!user){
        throw Error('Incorrect email');
    }
    const match = await bcrypt.compare(password, user.password);
    if(!match) {
        throw Error('Incorrect passwrd');
    }
    return user;
}

UserSchema.statics.update = async function (id, update) {
    if(!update.username && !update.email && !update.password){
        throw Error('No data can be updated');
    }
    if(!validator.isEmail(update.email)){
        throw Error('Email is not valid');
    }
    if (update.password && !validator.isStrongPassword(update.password)){
        throw Error('Password not strong enough');
    }
    if(update.password){
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(update.password, salt);
        update.password = hash
    }
    const updateuser = await this.findByIdAndUpdate(id, {$set:update}, {new:true})
    return updateuser;
};

UserSchema.statics.deleteuser = async function (id) {
    const exists = await this.findById(id);
    if(!exists){
        throw Error('User is not exist');
    }
    await this.findByIdAndDelete(id)
};

UserSchema.statics.getuser = async function (id) {
    const user = await this.findById(id);
    if(!user){
        throw Error('User is not exist');
    }
    return user
};

module.exports = mongoose.model('User', UserSchema)