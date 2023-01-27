import React,{useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axiosBase from '../axios'
import Form from '../components/Form'
import { userContext } from '../context/UserContext'


function Login() {
  const {setusername} = useContext(userContext)
  const navigate = useNavigate()
  
  const handleSubmit = (e, userInfo) => {
    e.preventDefault()
    axiosBase.post("/login", userInfo)
    .then(({data}) => {
      if(data.user) {
        setusername(data.user)
        navigate('/')
      }
    })
    .catch((error) => console.log(error.message))
  }
  

  return (
   <Form handleSubmit={handleSubmit} title='Login'/>
  )
}

export default Login