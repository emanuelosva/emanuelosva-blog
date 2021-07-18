import { useContext } from 'react'
import { ThemeContext } from './themeProvider'
import theme, { THEMES } from './theme'

export default function useTheme() {
  const { theme: themeName, setTheme } = useContext(ThemeContext)
  const toogleTheme = () => setTheme(changeTheme(themeName))

  return {
    theme: theme[themeName],
    toogleTheme,
  }
}

function changeTheme(themeName) {
  return themeName === THEMES.DARK ? THEMES.LIGTH : THEMES.DARK
}
