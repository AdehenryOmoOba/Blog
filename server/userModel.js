const mongoose = require('mongoose')


const userSchema = new mongoose.Schema({
    name: {type: String, unique: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    phone: String,
    profilePicURL: String, 
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date}
})

const UserModel = mongoose.model('users', userSchema)
module.exports = UserModel
