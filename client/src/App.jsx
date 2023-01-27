import React, {useState, useEffect} from 'react'
import { Route,Routes } from 'react-router-dom'
import axiosBase from './axios.js'
import Header from './components/Header'
import Home from './pages/Home'
import Latest from './pages/Latest'
import Login from './pages/Login'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import SInglePost from './pages/SInglePost'


function App() {
  const [posts, setPosts] = useState([])
  const [error, setError] = useState("")

  useEffect(() => {
    axiosBase('/')
    .then(({data, ...others}) => {
      setPosts(data.posts)
      console.log({others})
    })
    .catch((error) => setError(error.message))
  }, [])

  if(posts.length) console.log(posts)
  if(error) console.log(error)
  
  return (
    <div className="App">
     <Header />
     <main>
      <Routes>
       <Route path='/' element={<Home />}/>
       <Route path='/latest' element={<Latest />}/>
       <Route path='/posts/:id' element={<SInglePost />}/>
       <Route path='/login' element={<Login />}/>
       <Route path='/register' element={<Register />}/>
       <Route path='/profile' element={<Profile />}/>
      </Routes>
     </main>
   </div>
  )
}

export default App
