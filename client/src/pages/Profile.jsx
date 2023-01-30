import React,{useState,useRef} from 'react'
import defaultProfilePic from '../assets/profile_pic_placeholder.png'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { storage } from '../firebase/storageConfig'


const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
}
const infoStyle = {
  height: '25rem',
  width: '100%',
  display: 'flex',
  backgroundColor: '#ffffff',
  borderRadius: '1rem',
  padding: '2rem',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
}
const infoChildStyle = {
  height: '100%',
  width: '50%'
}
const ppStyles = {
    height: '100%',
    width: '100%',
    objectFit: "cover",
    borderRadius: '10rem'
}
const uploadBtnStyles = {
    fontSize: '1.3rem',
    padding: '0.6rem 1rem',
    backgroundColor: '#08ee08',
    color: '#333333',
    borderRadius: '0.5rem',
    border: 'none',
    outline: 'none',
    marginLeft: '4rem'
}
const inputStyle = {
  position: 'relative',
  width: '100%',
  backgroundColor: '#f9f9f9',
  border: 'none',
  outline: 'none',
  padding: '1.3rem 1rem 1.3rem',
  borderRadius: '0.5rem',
  color: 'gray',
  fontWeight: '500',
  fontSize: '1.3rem'
}

function Profile() {
  const [profilePicData, setProfilePicData] = useState(null)
  const [profilePicURL, setProfilePicURL] = useState("")
  const imgDataRef = useRef()

  const selectPicture = (e) => {
    const imgData = e.target.files[0]
    if(imgData) setProfilePicData(imgData)
  }
  

// Preview selected image
if (profilePicData){
    const imgPreview = URL.createObjectURL(profilePicData)
    imgDataRef.current = profilePicData
    setProfilePicData(null)
    setProfilePicURL(imgPreview)
}

// Upload selected image
const uploadImage = () => {
    const storageRef = ref(storage, "profile-pics/63d4ffaed5321072929763a9")
    uploadBytes(storageRef, imgDataRef.current)
    .then((snapShop) => {
      getDownloadURL(storageRef)
      .then((url) => {
        setProfilePicURL(url)
      })
      .catch((error) => console.log(error.message))
    })
    .catch((error) => console.log(error.message))
}

const userInfo = [['username', 'Adehenry'], ['name', 'Ade Henry'], ['email', 'adehenry@gmail.com'],[ 'phone', '+2348012345678']]


  return (
    <div style={pageStyles}>
      <div className="info" style={infoStyle}>
        <div className="left" style={{...infoChildStyle}}>
          <label htmlFor="file-input">
            <div className="profile-picture">
              <img src={profilePicURL ? `${profilePicURL}` : defaultProfilePic} alt="profile-picture" style={ppStyles}/>
            </div>
          </label>
          <input onChange={selectPicture} id="file-input" type="file" name="profile-picture"  accept='image/png image/PNG image/jpeg image/jpg image/webp' style={{display:"none"}}/>
          <button onClick={uploadImage} style={uploadBtnStyles}>Upload</button>
        </div>
        <div className="right" style={{...infoChildStyle, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
          {userInfo.map((info) => 
            (<div key={info[0]} className="field" style={{width:"100%", position:"relative"}}>
            <input type="text" name='text' style={inputStyle}  value={`${info[0].toUpperCase()}: ${info[1]}`} contentEditable='false'/>
          </div>)
          )}
        </div>
      </div>
    </div>
  )
}

export default Profile