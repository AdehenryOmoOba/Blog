import React from 'react'
import postImg from '../assets/post-img.webp'
import author from '../assets/author.jpg'
import { useNavigate } from 'react-router-dom'


function Post({id}) {
const navigate = useNavigate()
  const openPost = () => {
    console.log(`Post id ${id} clicked`)
    navigate(`/posts/${id}`)
  }

  return (
    <div className="post" onClick={openPost}>
     <div className="left">
      <img src={postImg} alt="cover-image" />
     </div>
     <div className="right">
     <h2 className="title">How to deploy a React project to a free web host server</h2>
     <div className="text">
     <p className="intro truncate">Once you've successfully built and tested your React app, the final step is hosting and deploying it on a server. This makes your React app public, allowing other users to see your app using a URL. There are numerous hosting and deployment, successfully built and tested your React app, the final step is hosting and deploying it on a server</p>
     <a href="">Read More</a>
     </div>
     <div className="tags">
       <a href="">JavaScript</a>
       <a href="">ReactJS</a>
       <a href="">webDev</a>
     </div>
     <div className="author">
       <div className="author-info">
        <img src={author} alt="author" />
        <p className="name">Henry A.</p>
       </div>
       <span>|</span>
       <div className="posted-at">
        <p className="time-stamp"><em>Posted At </em> - Dec 28, 2022</p>
       </div>
     </div>
    </div>
   </div>
  )
}

export default Post