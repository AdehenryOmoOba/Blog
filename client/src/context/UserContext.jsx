import React,{createContext,useState, useEffect} from 'react'
import axiosBase from '../axios'


export const userContext = createContext()

function UserProvider({children}) {
  const [username, setusername] = useState("")
  useEffect(() => {
    axiosBase("/login")
    .then(({data}) => {
      if(data.user) {
        setusername(data.user)
      }
    })
    .catch((error) => console.log(error.message))
  })

  return (
    <userContext.Provider value={{currentUser: username, setusername}}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider