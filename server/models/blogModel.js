const mongoose = require('mongoose')


const blogSchema = new mongoose.Schema({
    postImg: {type: String, required: true},
    title: {type: String, required: true},
    content: {type: String, required: true},
    tags: {type: [String], required: true},
    authorId: String,
    postedAt: {type: String, default: Date.now},
    updatedAt: {type: String}
})

const BlogModel = mongoose.model('blogs', blogSchema)
module.exports = BlogModel
