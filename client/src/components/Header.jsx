import React, {useContext,useRef } from 'react'
import logo from '../assets/logo-tr.png'
import {Link, useNavigate} from 'react-router-dom'
import { themeContext } from '../context/ThemeContext'
import { userContext } from '../context/UserContext'
import axiosBase from '../axios'
import placeHolderImg from '../assets/profile_pic_placeholder.png'

const userImgStyles = {
  height: "4.5rem",
  width: "4.5rem",
  borderRadius: "50%",
  border: '0.3rem solid #f8eaea',
  marginLeft: '1.6rem'
}

function Header() {
  const theme = useContext(themeContext)
  const {userData, setuserData} = useContext(userContext)
  const navigate = useNavigate()
  const headerRef = useRef()
  const countRef = useRef(0)

  function countRenders() {
    countRef.current++
    console.log(countRef.current)
  }

  countRenders()

  function debounce() {
      let setTimeoutID;
    return function()  {
      if (setTimeoutID) {
          clearTimeout(setTimeoutID)
      }
     if(headerRef?.current){
      setTimeoutID =  setTimeout(() => {
        if(window.scrollY <= 100){
          headerRef.current.classList.remove('shadow')
        }else{
          if(window.scrollY >= 150) headerRef.current.classList.add('shadow')
      }
      }, 500);
     }
    }
  }

  window.addEventListener('scroll', debounce())


  const handleLogout = () => {
    console.log(userData)
    console.log(theme)
    axiosBase('/logout')
    .then(() => {
      setuserData("")
      navigate('/')
    })
    .catch((error) => console.log(error.message))
  }

  return (
    <header ref={headerRef}>
      <div className="contain" style={{display: 'flex', alignItems:'center', justifyContent:'space-between', color:'inherit'}}>
        <div className="logo-container" style={{display: 'flex', alignItems:'center'}} onClick={window.scrollTo(0,0)}>
         <div className='logo' style={{ height:'10rem', width:'10rem',  display:'flex', justifyContent:'flex-end', marginLeft: '-3.5rem'}}>
          <img src={logo} alt="logo"   style={{ objectFit:'contain'}}/>
         </div>
         <span style={{fontSize:'2.4rem', fontWeight:'700', color:'#410FF8',marginLeft: '-3.5rem',}}>Adeh-Blog</span>
        </div>
        <nav>
         <Link to='/'>Home</Link>
         <Link to='/latest'>Latest</Link>
         {userData?.username && <Link to='/profile'>Profile</Link>}
         {userData?.username ? <button onClick={handleLogout}>Logout</button> : <Link to='/login'>Login</Link>}
        </nav>
         { userData?.username && 
           <div style={{display: 'flex', alignItems: 'center'}}>
           <p>welcome, <i>{userData?.username} !</i></p>
           <img src={userData.profilePicURL ? userData.profilePicURL : placeHolderImg} alt='user-Image' style={userImgStyles} />
           </div>
        }
      </div>
  </header>
  )
}

export default Header