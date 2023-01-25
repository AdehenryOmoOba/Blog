import React from 'react'
import Post from '../components/Post'


function Home() {

  let posts = [{id: 1,Post}, {id: 2,Post}, {id: 3,Post}, {id: 4,Post}]

  return (
    <>
    {posts.map(({Post, id}) => (<Post key={id} id={id} />))}
    </>
  )
}

export default Home