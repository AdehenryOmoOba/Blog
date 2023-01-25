import React from 'react'
import { useParams } from 'react-router-dom'
import Post from '../components/Post'


function SInglePost() {
    
 const {id} = useParams()

 let posts = [{id: 1,Post}, {id: 2,Post}, {id: 3,Post}, {id: 4,Post}]

 const post = posts.find((post) => post.id === Number(id))

  return ( <post.Post /> )
}

export default SInglePost