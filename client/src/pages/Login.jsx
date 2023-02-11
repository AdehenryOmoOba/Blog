import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axiosBase from '../axios'
import Form from '../components/form/Form'
import { userContext,  } from '../context/UserContext'
import Spinner from '../components/Spinner/Spinner'


function Login() {
  const {setuserData} = useContext(userContext)
  const [spinner, setSpinner] = useState(false)
  const navigate = useNavigate()
  
  const handleSubmit = (e, userInfo) => {
    e.preventDefault()
    setSpinner(true)
    axiosBase.post("/login", userInfo)
    .then(({data}) => {
      if(data.user.username) {
        console.log(data.user)
        setSpinner(false)
        setuserData(data.user)
        navigate('/')
      }
    })
    .catch((error) => {
      setSpinner(false)
       console.log(error.message)
      })
  }
  

  return (
    <>
     {spinner && <Spinner />}
     <Form handleSubmit={handleSubmit} title='Login'/>
    </>
  )
}

export default Login