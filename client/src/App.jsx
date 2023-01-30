import React, {useState, useEffect,useContext} from 'react'
import { Route,Routes } from 'react-router-dom'
import axiosBase from './axios.js'
import Header from './components/Header'
import { blogsContext } from './context/BlogsContext.jsx'
import Home from './pages/Home'
import Latest from './pages/Latest'
import Login from './pages/Login'
import Profile from './pages/Profile.jsx'
import Register from './pages/Register.jsx'
import SInglePost from './pages/SInglePost'


function App() {
  const [blogs, setBlogs] = useState([])
  const [error, setError] = useState("")
  const {setContextBlogs} = useContext(blogsContext)

  useEffect(() => {
    axiosBase('/')
    .then(({data}) => {
      setContextBlogs(data.blogs)
      const sortedBlogs = data.blogs.sort((a, b) => b.postedAt - a.postedAt)
      setBlogs(sortedBlogs)
    })
    .catch((error) => setError(error.message))
  }, [])

  if(error) console.log(error)
  
  return (
    <div className="App">
     <Header />
     <main>
      <Routes>
       <Route path='/' element={<Home blogs={blogs}/>}/>
       <Route path='/latest' element={<Latest />}/>
       <Route path='/blogs/:id' element={<SInglePost />}/>
       <Route path='/login' element={<Login />}/>
       <Route path='/register' element={<Register />}/>
       <Route path='/profile' element={<Profile />}/>
      </Routes>
     </main>
   </div>
  )
}

export default App
