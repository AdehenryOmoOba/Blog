import React,{createContext,useState, useEffect} from 'react'
import axiosBase from '../axios'


export const userContext = createContext()

function UserProvider({children}) {
  const [userData, setuserData] = useState(null)

  useEffect(() => {
    axiosBase("/login")
    .then(({data}) => {
      if(data.user) {
        setuserData(data.user)
      }
    })
    .catch((error) => console.log(error.message))
  }, [])

  return (
    <userContext.Provider value={{userData, setuserData}}>
        {children}
    </userContext.Provider>
  )
}

export default UserProvider