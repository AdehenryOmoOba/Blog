import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import ThemeProvider from './context/ThemeContext'
import UserProvider from './context/UserContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
     <ThemeProvider>
      <UserProvider>
          <App />
      </UserProvider>
     </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)