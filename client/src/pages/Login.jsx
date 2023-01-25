import React,{useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axiosBase from '../axios'
import { userContext } from '../context/UserContext'


const loginCardStyles = {
   width: "40rem",
   backgroundColor: "white", 
   display: "flex", 
   alignItems: "center",
   borderRadius: "2rem",
   color: "#333333", 
   justifyContent: "center", 
   flexDirection: "column", 
   padding: "4rem", 
   gap: "4rem", 
   boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
}
const inputStyle = {
  position: 'relative',
  width: '100%',
  backgroundColor: '#f9f9f9',
  border: 'none',
  outline: 'none',
  padding: '2.5rem 1rem 0.75rem',
  borderRadius: '0.5rem',
  color: '#333333',
  fontWeight: '500',
  fontSize: '1.3rem'
}
const labelStyle = {
  position: 'absolute',
  left: '0',
  transition: '0.5s',
  pointerEvents: 'none',
  padding: '1.5rem 1rem',
  fontStyle: 'normal'
}
const linkStyles = {
  position: 'relative',
  width: '100%',
  display: 'flex',
  justifyContent: 'space-between'
}
const aStyles = {
  textDecoration: 'none',
  fontSize: '1.2rem',
}
const submitBtnStyle = {
  padding: '1.5rem',
  backgroundColor: '#410FF8',
  borderRadius: '0.5rem',
  color: 'white',
  fontWeight: '600',
  fontSize: '1.6em',
  letterSpacing: '0.05em',
  cursor: 'pointer',
  border: 'none'
}


function Login() {
  const [userInfo, setUserInfo] = useState({username: "", password: ""})
  const {setusername} = useContext(userContext)
  const navigate = useNavigate()
  
  const handleSubmit = (e) => {
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
  
  const updateField = (e) => {
   setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }


  return (
    <div style={{backgroundColor: "transparent", height: "50vh", display: "grid", placeContent: "center"}}>
      <div className="login" style={loginCardStyles}>
        <h2 style={{fontSize: "2em"}}>LOGIN</h2>
        <form onSubmit={handleSubmit} style={{width:"100%", display:"flex", flexDirection:"column", gap:'2.5rem'}}>
          <div className="row" style={{width:"100%", position:"relative"}}>
            <input type="text" name='username' style={inputStyle} required value={userInfo.username} onChange={updateField} />
            <i style={labelStyle}>Username</i>
          </div>
          <div className="row" style={{width:"100%", position:"relative"}}>
            <input type="password" name='password' style={inputStyle} required value={userInfo.password}  onChange={updateField} />
            <i style={labelStyle}>Password</i>
          </div>
          <div className="links" style={linkStyles}>
            <a href="" style={aStyles}>Reset Password</a>
            <a href="" style={aStyles}>Register</a>
          </div>
          <button type="submit" style={submitBtnStyle}>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login