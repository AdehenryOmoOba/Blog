import React from 'react'
import Blog from '../components/Blog'


function Home({blogs}) {

  return (
    <>
    {blogs?.map((blog) => (<Blog key={blog._id} blog={blog} />))}
    </>
  )
}

export default Home