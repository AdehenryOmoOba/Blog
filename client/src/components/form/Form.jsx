import './form.css'
import React,{useRef, useState,useEffect} from 'react'
import { Link } from 'react-router-dom'
import Tooltip from '../tooltip/tooltip'
import {BsEye} from 'react-icons/bs'
import { validatePassword } from '../../utils/validatePassword'


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
    transition: 'height 0.5s ease 0s',
    boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px"
 }
 const inputStyle = {
   position: 'relative',
   width: '100%',
   backgroundColor: '#f9f9f9',
   border: 'none',
   outline: 'none',
   padding: '2.5rem 5rem 0.75rem 1rem',
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
 const eyeStyles = {
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  height: '1.2rem',
  width: '1.2rem',
  cursor: 'pointer'
 }


function Form({handleSubmit, emailField, confirmPwdField, title}) {
  const [userInfo, setUserInfo] = useState({})
  const erroDivRef = useRef()
  useEffect(() => {
    erroDivRef?.current?.classList.add('close')
  }, [])
  
  const altTitle = title === 'Login' ? 'register' : 'login'

  const updateField = (e) => {
    setUserInfo({...userInfo, [e.target.name]: e.target.value})
  }

  const checkPassword = (e, userInfo) => {
    e.preventDefault()
    const listElements = erroDivRef?.current.firstElementChild.firstElementChild.children
    const response = validatePassword(userInfo.password, listElements)
    if (response) return console.log('Password is good 👍')
    erroDivRef?.current.firstElementChild.classList.replace('close', 'info')
    erroDivRef?.current.classList.remove('close')
    erroDivRef?.current.firstElementChild.classList.add('info')
  }

  const removeErrorDiv = () => {
    erroDivRef?.current?.firstElementChild.classList.replace('info', 'close')
    erroDivRef?.current?.classList.add('close')
  }

  const revealPassword = (e) => {
    const input = e.target.parentNode.firstChild
    input.getAttribute('type') === 'password' ? input.setAttribute('type', 'text') : input.setAttribute('type', 'password')
  }

  return (
    <div style={container}>
    <div style={loginCardStyles}>
      <h2 style={{fontSize: "2em"}}>{title}</h2>
      <form onSubmit={confirmPwdField ? (e) => checkPassword(e, userInfo) : (e) => handleSubmit(e, userInfo)} style={{width:"100%", display:"flex", flexDirection:"column", gap:'2.5rem'}}>
        <div style={{width:"100%", position:"relative"}}>
          <input type="text" name='username' style={inputStyle} required value={userInfo.username || ""} onChange={updateField} />
          <i style={labelStyle}>Username</i>
        </div>
        {emailField && <div style={{width:"100%", position:"relative"}}>
          <input type="email" name='email' style={inputStyle} required value={userInfo.email || ""} onChange={updateField} />
          <i style={labelStyle}>Email</i>
        </div>}
        <div style={{width:"100%", position:"relative"}}>
          <input type="password" name='password' style={inputStyle} required value={userInfo.password || ""} onFocus={removeErrorDiv} onChange={updateField} />
          <i style={labelStyle}>Password</i>
          <BsEye style={eyeStyles} onClick={revealPassword}/>
          {confirmPwdField && <Tooltip />} 
        </div>
        {confirmPwdField && 
          <div ref={erroDivRef} className="validation-container">
           <div className="validation close">
               <ul>
                   <li data-error-check="isUpperCase">At least one uppercase character</li>
                   <li data-error-check="isLowerCase">At least one lowercase character</li>
                   <li data-error-check="isNumber">At least one digit (0-9)</li>
                   <li data-error-check="isSpecialXter">At least one special character (! @ # $ % ^ & *)</li>
                   <li data-error-check="isLength">At least 5 character length</li>
                 </ul>
           </div>
          </div>
        }
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