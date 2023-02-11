import React,{useState,useRef,useContext} from 'react'
import defaultProfilePic from '../assets/profile_pic_placeholder.png'
import {ref, uploadBytes, getDownloadURL} from "firebase/storage"
import { storage } from '../firebase/storageConfig'
import { userContext } from '../context/UserContext'
import axiosBase from '../axios'
import {FiSearch} from 'react-icons/fi'
import {MdOutlineEditNote} from 'react-icons/md'
import {CgSoftwareUpload} from 'react-icons/cg'


const flex = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
}
const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '100vh',
    gap: '2rem',
    paddingBlock: '2rem'
}
const infoStyle = {
  minHeight: '25rem',
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: '#ffffff',
  borderRadius: '1rem',
  padding: '2rem',
  boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
}
const titleStyle = {
  fontSize: '1.6rem',
  color: '#f0abab',
  backgroundColor: '#f9f9f9',
  display: 'inline-block',
  padding: '0.4rem 1.5rem',
  borderRadius: '0.5rem'
}
const searchStyle = {
  ...infoStyle,
  minHeight: '5rem',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '1rem'
}
const blogsStyle = {
  ...infoStyle,
  minHeight: '50vh',
}
const infoChildStyle = {
  height: '100%',
  width: '50%'
}
const ppStyles = {
    height: '100%',
    width: '100%',
    objectFit: "cover",
    borderRadius: '10rem',
    border: '0.3rem solid #f8eaea'
}
const uploadBtnStyles = {
    ...flex,
    fontSize: '1.6rem',
    fontWeight: '600',
    padding: '0.6rem 1rem',
    borderRadius: '0.5rem',
    border: 'none',
    outline: 'none',
    marginLeft: '3rem',
}
const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  marginRight: '0.5rem',
  fontSize: '1.3rem',
  color: '#333',
  fontWeight: '700',
  cursor: 'pointer'
}
const radioDiv = {
  height: '1.6rem',
  width: '1.6rem',
  marginLeft:'1rem',
  borderRadius: '50%',
  border: '0.2rem solid gray',
  position: 'relative'
}
const searchBoxStyles = {
  flex: '1',
  display: 'flex',
  height: '4rem',
  position: 'relative',
  borderRadius: '5rem',
}
const searcInputStyles = {
  width: '100%',
  borderRadius: '5rem',
  paddingInline: '2rem 4rem',
  border: '0.1rem solid #e7e7e7',
  outline: 'none',
  backgroundColor: '#fff8f8',
  fontSize: '1.4rem'
}
const searchBtnStyles = {
  ...flex,
  position: 'absolute',
  height: '3rem',
  width: '3rem',
  top: '50%',
  right: '0.6rem',
  transform: 'translateY(-50%)',
  borderRadius: '50%',
  outline: 'none',
  border: 'none',
  cursor: 'pointer',
  color: 'rgb(65, 15, 248)',
  fontSize: '1.6rem',
  backgroundColor: 'rgb(230, 224, 255)'
}
const fieldStyles = {
  width:"100%",
  position:"relative",
  display: 'flex',
  flex: '0.4',
  marginBottom: '1rem',
  justifyContent: 'flex-start',
  alignItems: 'center'
}
const fieldValueStyles = {
  ...fieldStyles,
  flex: '1',
  cursor: 'pointer',
  justifyContent: 'space-between',
}

function Profile() {
  const [profilePicData, setProfilePicData] = useState(null)
  const [profilePicURL, setProfilePicURL] = useState("")
  const {userData, setuserData} = useContext(userContext)
  const [searchOption, setsearchOption] = useState('tag')
  const imgDataRef = useRef()
  const searchRef = useRef()

  const selectPicture = (e) => {
    const imgData = e.target.files[0]
    if(imgData) {
      setProfilePicData(imgData)
    }
  }

  const handleSearchOption = (e) => {
    searchOption === 'tag' ? setsearchOption('title') : setsearchOption('tag')
  }

  const handleSearch = () => {
    console.log(`Search by ${searchOption}: ${searchRef.current.value}`)
  }
  

// Preview selected image
if (profilePicData){
    const imgPreview = URL.createObjectURL(profilePicData)
    imgDataRef.current = profilePicData
    setProfilePicData(null)
    setProfilePicURL(imgPreview)
}

const currentImgSrc = profilePicURL ? profilePicURL : userData?.profilePicURL ? userData?.profilePicURL : defaultProfilePic

// Upload selected image
const uploadImage = () => {
    const storageRef = ref(storage, `profile-pics/${userData._id}`)
    uploadBytes(storageRef, imgDataRef.current)
    .then((snapShop) => {
      getDownloadURL(storageRef)
      .then((url) => {
        axiosBase.put('/update-user', {userId: userData._id, profilePicURL: url})
        .then(({data}) => {
          setProfilePicURL("")
          setuserData(data.updatedUser)
        })
        .catch((error) => console.log(error.message))
      })
      .catch((error) => console.log(error.message))
    })
    .catch((error) => console.log(error.message))
}

const userInfo = [['Username', userData?.username || 'n/a'], ['Name', userData?.name || 'n/a'], ['Email', userData?.email || 'n/a'],[ 'Phone', userData?.phone || 'n/a']]

  return (
    <div style={pageStyles}>
      <div className="info" style={infoStyle}>
        <div style={{marginBottom: '2rem'}}>
          <h3 style={titleStyle}>Info</h3>
        </div>
        <div style={{display: 'flex'}}>
          <div className="left" style={{...infoChildStyle}}>
            <label htmlFor="file-input">
              <div className="profile-picture">
                <img src={currentImgSrc} alt="profile-picture" style={ppStyles}/>
              </div>
            </label>
            <input onChange={selectPicture} id="file-input" type="file" name="profile-picture"  accept='image/png image/PNG image/jpeg image/jpg image/webp' style={{display:"none"}}/>
            <button className='disable-btn' onClick={uploadImage} style={uploadBtnStyles} disabled={profilePicURL ? false : true}>
              <p style={{marginRight:'0.5rem', fontSize: '1rem', fontWeight: '800 '}}>Upload</p>
              <CgSoftwareUpload />
            </button>
          </div>
          <div className="right" style={{...infoChildStyle, display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
            { userInfo.map((info) => 
              (<div key={info[0]} style={{display: 'flex'}}>
                <div className="field" style={fieldStyles}>
                 <h3 className='field-name' style={{...titleStyle, marginRight: '1rem', fontSize: '1.2rem'}}>{info[0]}</h3>
                </div>
                <div className="field-value" style={fieldValueStyles}>
                 <div className="field-value-first" style={{fontSize: '1.2rem '}}>{info[1]}</div>
                 <div className='editBtn'>
                  <MdOutlineEditNote />
                 </div>
                </div>
              </div>)
              )}
          </div>
       </div>
      </div>
      <div style={searchStyle}>
        <div>
          <h3 style={titleStyle}>Search Blog</h3>
        </div>
        <div className="search" style={{flex: '1', ...flex}}>
         <div className="search-by-tags"  style={{...flex, marginRight: '1rem'}}>
          <label htmlFor="search-by-tags" style={labelStyle}>
            Search by tags
            <input style={{display: 'none'}} type="radio" name="search-option" id="search-by-tags" value='tag' checked={searchOption === 'tag'} onChange={handleSearchOption}/>
            <span className='radio-span' style={radioDiv}></span>
          </label>
         </div>
         <div className="search-by-title"  style={{...flex, marginRight: '1rem'}}>
          <label htmlFor="search-by-title" style={labelStyle}>
            Search by title
            <input style={{display: 'none'}} type="radio" name="search-option" id="search-by-title" value='title' checked={searchOption === 'title'} onChange={handleSearchOption}/>
            <span className='radio-span' style={radioDiv}></span>
          </label>
         </div>
         <div className="search-box" style={searchBoxStyles}>
          <input type="search" name="search-box"  style={searcInputStyles} ref={searchRef} />
          <button style={searchBtnStyles} onClick={handleSearch}>
            <FiSearch />
          </button>
         </div>
        </div>
      </div>
      <div style={blogsStyle}>
        <div style={{marginBottom: '2rem'}}>
          <h3 style={titleStyle}>Your Blogs</h3>
        </div>

      </div>
    </div>
  )
}

export default Profile