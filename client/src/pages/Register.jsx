import axiosBase from '../axios'
import Form from '../components/form/Form'
import { useNavigate } from 'react-router-dom'


function Register() {
    const navigate = useNavigate()
    
    const handleSubmit = (e, userInfo) => {
      e.preventDefault()
      axiosBase.post("/register", userInfo)
      .then(({data}) => {
       console.log({fromServer: data})
       navigate('/login')
      })
      .catch((error) => console.log(error.message))
    }
    
  
    return (
     <Form handleSubmit={handleSubmit} emailField confirmPwdField title='Register'/>
    )
}

export default Register