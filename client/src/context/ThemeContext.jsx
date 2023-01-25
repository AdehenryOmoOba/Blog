import React,{createContext} from 'react'

export const themeContext = createContext()

function ThemeProvider({children}) {
  return (
    <themeContext.Provider value={{theme: "light"}}>
        {children}
    </themeContext.Provider>
  )
}

export default ThemeProvider