import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'
import UserProvider from './context/UserContext'
import BlogsContextProvider from './context/BlogsContext'
import NotificationContextProvider from './context/NotificationContext'




ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
    <NotificationContextProvider>
     <BlogsContextProvider>
      <ThemeProvider>
       <UserProvider>
          <App />
       </UserProvider>
      </ThemeProvider>
     </BlogsContextProvider>
     </NotificationContextProvider>
    </BrowserRouter>
  </React.StrictMode>
)
