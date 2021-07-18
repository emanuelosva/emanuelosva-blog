import { createContext, useState } from 'react'
import { THEMES } from './theme'

export const ThemeContext = createContext(THEMES.LIGTH)

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState(THEMES.LIGTH)

  return (
    <ThemeContext.Provider value={ { theme, setTheme } }>
      {children}
    </ThemeContext.Provider>
  )
}
