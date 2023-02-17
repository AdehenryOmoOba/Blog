import React,{useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import axiosBase from '../axios'
import Form from '../components/form/Form'
import { userContext,  } from '../context/UserContext'
import Spinner from '../components/Spinner/Spinner'
import { notificationContext } from '../context/NotificationContext'


function Login() {
  const {setuserData} = useContext(userContext)
  const {notify} = useContext(notificationContext)
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
        notify({active: true, message: "Login successful", state: 'success'})
        navigate('/')
      }
    })
    .catch((error) => {
      setSpinner(false)
       const errorMessage = error.response?.data.message || "Something went wrong"
       notify({active: true, message: errorMessage, state: 'error'})
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