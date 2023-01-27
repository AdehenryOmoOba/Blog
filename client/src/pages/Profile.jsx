import React,{useState,useRef} from 'react'
import defaultProfilePic from '../assets/profile_pic_placeholder.png'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { storage } from '../firebase/storageConfig'


const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: "50vh"
}
const ppDivStyles = {
    height: '15rem',
    width: '15rem',
    borderRadius: '10rem',
    marginBottom: '2rem'
}
const ppStyles = {
    height: '100%',
    width: '100%',
    objectFit: "cover",
    borderRadius: '10rem'
}
const selectPPBtnStyles = {
    fontSize: '1.3rem',
    padding: '0.8rem 1rem',
    backgroundColor: '#410FF8',
    color: '#ffffff',
    margin: '0rem 0.1rem 5rem',
    borderRadius: '0.5rem',
}
const imgInfoStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '2rem'
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
    const storageRef = ref(storage, "profile-images123")
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


  return (
    <div style={pageStyles}>
        <div className="profile-picture" style={ppDivStyles}>
            <img src={profilePicURL ? `${profilePicURL}` : defaultProfilePic} alt="profile-picture" style={ppStyles}/>
        </div>
        <div className="upload" style={{display: 'flex'}}>
            <label htmlFor="file-input" style={selectPPBtnStyles}>Select profile picture</label>
            <input onChange={selectPicture} id="file-input" type="file" name="profile-picture"  accept='image/png image/PNG image/jpeg image/jpg image/webp' style={{display:"none"}}/>
            <div onClick={uploadImage} style={{...selectPPBtnStyles, backgroundColor: '#08ee08', color: '#333333'}}>Upload</div>
        </div>
    </div>
  )
}

export default Profile