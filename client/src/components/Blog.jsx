import React from 'react'
import { useNavigate } from 'react-router-dom'


function Blog({blog}) {
  const navigate = useNavigate()

  const openBlog = () => {
    navigate(`/blogs/${blog._id}`)
  }

  const handleDate = (dateStr) => {
    const date = Intl.DateTimeFormat('eng-ng', {dateStyle: 'long'}).format(dateStr)
    return date
  }

  return (
    <div className="blog" onClick={openBlog}>
     <div className="left">
      <img src={blog?.postImg} alt="cover-image" />
     </div>
     <div className="right">
     <h2 className="title">{blog?.title}</h2>
     <div className="text">
     <p className="intro truncate">{blog?.content}</p>
     <a href="">Read More</a>
     </div>
     <div className="tags">
      {blog?.tags.map((tag, index) => (
        <a key={index} href="">{tag}</a>
      ))}
     </div>
     <div className="author">
       <div className="author-info">
        <img src={blog?.authorInfo[0].profilePicURL} alt="author" />
        <p className="name">{blog?.authorInfo[0].name}</p>
       </div>
       <span>|</span>
       <div className="posted-at">
        {blog && <p className="time-stamp"><em>Posted At </em> - {handleDate(blog.postedAt)}</p> }
       </div>
     </div>
    </div>
   </div>
  )
}

export default Blog