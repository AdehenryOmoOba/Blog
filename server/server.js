require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./db.json')
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

  let result = await Promise.all([BlogModel.find(), UserModel.find({}, {name: 1, profilePicURL: 1})])

  let authorsMap = {}

  for (let author of result[1]) {
    const {name, profilePicURL = ""} = author
    authorsMap[author._id] =  {name, profilePicURL}
  }

  const blogs = result[0].map((blog) => {
    const {_id, postImg, title, content, tags, authorId, postedAt} = blog
    return {_id, postImg, title, content, tags, authorId, postedAt, ...authorsMap[blog.authorId]}
  })

  
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
mongoose.connect(connectionStr, () => {
  console.log('Connected to adeh-blog_DB Database successfuly...')
  app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))
})

