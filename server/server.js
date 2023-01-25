
const express = require('express')
const app = express()
const db = require('./db.json')
const cors = require('cors')
const session = require('express-session')
const dotenv = require('dotenv')

dotenv.config()

const corsOptions = {
    origin: "http://localhost:5173",
    credentials: true,
}

app.use(session({secret: process.env.SESSION_SECRETE, resave: false, saveUninitialized: false, cookie: {maxAge: 1000 * 30}}))
app.use(cors(corsOptions))
app.use(express.json())

const secreteInfo = {
  developer : "Adehenry",
  channelName : "codeNovella",
  logo : "Adeh-Code"
}

app.get('/blog-api', (req, res) => {
  res.status(200).json({posts: db.posts})
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


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}...`)
})