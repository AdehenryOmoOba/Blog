import React,{useState} from 'react'
import { Link } from 'react-router-dom'

const container = {
    backgroundColor: "transparent",
    paddingBlock: '5rem',
    minHeight: "50vh",
    display: "grid",
    placeContent: "center"
  }
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
   textTransform: 'capitalize'
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

function Form({handleSubmit, emailField, confirmPwdField, title}) {
  const [userInfo, setUserInfo] = useState({})

  const updateField = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
   }

   const altTitle = title === 'Login' ? 'register' : 'login'

  return (
    <div style={container}>
    <div style={loginCardStyles}>
      <h2 style={{fontSize: "2em"}}>{title}</h2>
      <form onSubmit={(e) => handleSubmit(e, userInfo)} style={{width:"100%", display:"flex", flexDirection:"column", gap:'2.5rem'}}>
        <div style={{width:"100%", position:"relative"}}>
          <input type="text" name='username' style={inputStyle} required value={userInfo.username || ""} onChange={updateField} />
          <i style={labelStyle}>Username</i>
        </div>
        {emailField && <div style={{width:"100%", position:"relative"}}>
          <input type="email" name='email' style={inputStyle} required value={userInfo.email || ""} onChange={updateField} />
          <i style={labelStyle}>Email</i>
        </div>}
        <div style={{width:"100%", position:"relative"}}>
          <input type="password" name='password' style={inputStyle} required value={userInfo.password || ""}  onChange={updateField} />
          <i style={labelStyle}>Password</i>
        </div>
        {confirmPwdField && <div style={{width:"100%", position:"relative"}}>
          <input type="password" name='confirmPassword' style={inputStyle} required value={userInfo.confirmPassword || ""}  onChange={updateField} />
          <i style={labelStyle}>Confirm Password</i>
        </div>}
        <div style={linkStyles}>
          <a href="" style={aStyles}>Reset Password</a>
          <Link style={aStyles} to={`/${altTitle}`}>{altTitle}</Link>
        </div>
        <button type="submit" style={submitBtnStyle}>{title}</button>
      </form>
    </div>
  </div>
  )
}

export default Form