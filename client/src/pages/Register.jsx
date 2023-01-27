import React, { useContext } from 'react'
import axiosBase from '../axios'
import Form from '../components/Form'
import { useNavigate } from 'react-router-dom'
import { userContext } from '../context/UserContext'


function Register() {
    // const {setusername} = useContext(userContext)
    // const navigate = useNavigate()
    
    const handleSubmit = (e, userInfo) => {
      e.preventDefault()
      axiosBase.post("/register", userInfo)
      .then(({data}) => {
       console.log({fromServer: data})
      })
      .catch((error) => console.log(error.message))
    }
    
  
    return (
     <Form handleSubmit={handleSubmit} emailField confirmPwdField title='Register'/>
    )
}

export default Register