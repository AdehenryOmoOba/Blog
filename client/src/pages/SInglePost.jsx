import React,{useContext} from 'react'
import { useParams } from 'react-router-dom'
import Blog from '../components/Blog'
import { blogsContext } from '../context/BlogsContext'




function SInglePost() {

  const {contextBlogs} = useContext(blogsContext)
     
  const {id} = useParams()
 
  const blog = contextBlogs.find((blog) => blog._id === id)
 
  return ( <Blog blog={blog}/> )
}

export default SInglePost