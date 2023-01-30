require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const session = require('express-session')
const mongoose = require('mongoose')
const UserModel = require('./models/userModel')
const BlogModel = require('./models/blogModel')


const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(session({secret: process.env.SESSION_SECRETE, resave: false, saveUninitialized: false, cookie: {maxAge: 1000 * 60 * 60}}))
app.use(cors(corsOptions))
app.use(express.json())

const secreteInfo = {
  channelName: 'codeNovella',
  developer: 'Adehenry'
}

app.get('/blog-api', async (req, res) => {

  let blogs = await BlogModel.aggregate([
     {$lookup: {from: "users", localField: "authorId", foreignField: "_id", as: "authorInfo"}},
     {$project: {postImg: 1, title: 1, content: 1, tags: 1, postedAt: 1, updatedAt: 1, "authorInfo.name": 1, "authorInfo.profilePicURL": 1}}
    ])

  res.status(200).json({blogs})
})

app.post('/blog-api/login', (req, res) => {
  const {username, password} = req.body
  if(username === "adehenry" && password === "123") {
    req.session.secreteInfo = secreteInfo
    console.log("Logged In as: ",req.session.secreteInfo.developer)
    res.status(200).json({user: req.session.secreteInfo.developer})
    return
  }
  console.log("Unauthorised")
  res.sendStatus(401)
})

app.get('/blog-api/login', (req, res) => {

  if(req.session.secreteInfo) {
    console.log("Still logged in as : ",req.session.secreteInfo.developer)
    res.status(200).json({user: req.session.secreteInfo.developer})
    return
  }
  console.log("Session Expired")
  res.sendStatus(403)
})

app.get('/blog-api/logout', (req, res) => {
  req.session.destroy(() => console.log("Session terminated by user"))
  res.sendStatus(200)
})

app.post('/blog-api/register', async (req, res) => {
  const  newUserObj = {...req.body}
  const newUser = await new UserModel(newUserObj).save()
  res.status(200).json({status: 'success', newUser})

})

app.post('/blog-api/create-blog', async (req, res) => {
  const  newBlogObj = {...req.body}
  const newBlog = await new BlogModel(newBlogObj).save()
  res.status(200).json({status: 'success', newBlog})

})

app.put('/blog-api/update-blog', async (req, res) => {
  const {blogId, ...fields} = req.body
  const updatedBlog = await BlogModel.findByIdAndUpdate(blogId, {$set: {...fields}}, {new: true})
  res.status(200).json({status: 'success', updatedBlog})

})

app.put('/blog-api/update-user', async (req, res) => {
  const {userId, ...fields} = req.body
  const updatedUser = await UserModel.findByIdAndUpdate(userId, {$set: {...fields}}, {new: true})
  res.status(200).json({status: 'success', updatedUser})

})


const connectionStr = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.up9zn.mongodb.net/adeh-blog_DB`
const PORT = process.env.PORT || 5000

mongoose.set('strictQuery', true)
mongoose.connect(connectionStr, (error) => {
  if(error) {
    console.log(error.message)
    return
  }
  console.log('Connected to adeh-blog_DB Database successfuly...')
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
})

