import React, { useContext } from 'react'
import logo from '../assets/logo-tr.png'
import {Link, useNavigate} from 'react-router-dom'
import { themeContext } from '../context/ThemeContext'
import { userContext } from '../context/UserContext'
import axiosBase from '../axios'
import author from '../assets/author.jpg'

const imgStyles = {
  height: "3rem",
  width: "3rem",
  borderRadius: "50%",
  marginRight: "1rem",
  marginLeft: "2rem"
}

function Header() {
  const theme = useContext(themeContext)
  const {currentUser,setusername} = useContext(userContext)
  const navigate = useNavigate()

  const handleLogout = () => {
    console.log(currentUser)
    console.log(theme)
    axiosBase('/logout')
    .then(() => {
      setusername("")
      navigate('/')
    })
    .catch((error) => console.log(error.message))
  }

  return (
    <header style={{zIndex: '10'}}>
      <div className="contain" style={{display: 'flex', alignItems:'center', justifyContent:'space-between', color:'inherit'}}>
        <div className="logo-container" style={{display: 'flex', alignItems:'center'}}>
         <div className='logo' style={{ height:'10rem', width:'10rem',  display:'flex', justifyContent:'flex-end', marginLeft: '-3.5rem',}}>
          <img src={logo} alt="logo"   style={{ objectFit:'contain'}}/>
         </div>
         <span style={{fontSize:'2.4rem', fontWeight:'700', color:'#410FF8',marginLeft: '-3.5rem',}}>Adeh-Blog</span>
        </div>
        <nav>
         <Link to='/'>Home</Link>
         <Link to='/latest'>Latest</Link>
         {currentUser && <Link to='/profile'>Profile</Link>}
         {currentUser ? <button onClick={handleLogout}>Logout</button> : <Link to='/login'>Login</Link>}
        </nav>
         {currentUser && <img src={author} alt='user-Image' style={imgStyles}></img>}
      </div>
  </header>
  )
}

export default Header