import './toastNotification.css'
import ReactDOM from 'react-dom'
import {RiCloseFill} from 'react-icons/ri'
import {BsCheck} from 'react-icons/bs'
import {MdOutlineClose} from 'react-icons/md'
import { useContext, useEffect } from 'react'
import { notificationContext } from '../../context/NotificationContext'


export const Notification = () => {
  const {toastNotification, closeToast} = useContext(notificationContext)

  return (
    <div className={`toast ${toastNotification?.state === 'success' ?  "success" : "error"} ${toastNotification?.active && "active" }`}>
    <div className={`toast-container ${toastNotification?.state === 'success' ?  "success" : "error"}`}>
      <div className={`status-icon ${toastNotification?.state === 'success' ?  "success" : "error"}`}>
        {toastNotification?.state === 'success' ? <BsCheck /> : <MdOutlineClose />}
      </div>
      <div className="toast-title-msg">
         <h4>{toastNotification.state}</h4>
         <p>{toastNotification.message}!</p>
      </div>
      <div className="close-icon"  onClick={closeToast}>
        <RiCloseFill />
      </div>
    </div>
    <div className={`progress ${toastNotification?.state === 'success' ?  "success" : "error"} ${toastNotification?.active && "active" }`}></div>
  </div>
  )
}

const ToastNotification = ({children}) => {

    return  (
            ReactDOM.createPortal(
               <div style={{position: 'relative', height: '100%', width: '100%'}}>{children}</div>, document.getElementById('notification')
        ))
}

export default ToastNotification
