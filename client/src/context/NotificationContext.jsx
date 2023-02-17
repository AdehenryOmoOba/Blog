import React,{createContext,useState} from 'react'

export const notificationContext = createContext()

function NotificationContextProvider({children}) {
    
  const [toastNotification, setToastNotification] = useState({active: false, message: "", state: null})

  const element = document.getElementById('notification')

  let ToastTimeoutID;

  const removeElement = () => {
    setTimeout(() => {
      element.style.display = 'none'
    }, 1000);
  }

  const closeToast = () => {
    setToastNotification((previous) => ({...previous, active: false}))
    clearTimeout(ToastTimeoutID)
    removeElement()
  }

  const clearToastAfetrAnimation = () => {
   ToastTimeoutID = setTimeout(() => {
      closeToast()
      removeElement()
    }, 3000);
  }

  const notify = (payload) => {
    element.style.display = 'block'
    setToastNotification((prev) => ({...prev, ...payload}))
    clearToastAfetrAnimation()
  }

  return (
    <notificationContext.Provider value={{toastNotification, setToastNotification, closeToast, clearToastAfetrAnimation, notify}}>
        {children}
    </notificationContext.Provider>
  )
}

export default NotificationContextProvider