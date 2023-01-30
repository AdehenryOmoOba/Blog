import React,{createContext,useState} from 'react'

export const blogsContext = createContext()

function BlogsContextProvider({children}) {
  const [contextBlogs, setContextBlogs] = useState([])

  return (
    <blogsContext.Provider value={{contextBlogs, setContextBlogs}}>
        {children}
    </blogsContext.Provider>
  )
}

export default BlogsContextProvider