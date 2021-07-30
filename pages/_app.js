import { useState, useEffect } from 'react'
import { ThemeProvider } from 'styled-components'
import Layout from '@/components/layout'
import { theme, THEMES, GlobalStyles } from '@/theme'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const THEME_STORAGE = 'emanuelosva.io-site-theme'
  const [themeName, setTheme] = useState(THEMES.LIGTH)

  const toogleTheme = () => {
    const toggledTheme = themeName === THEMES.LIGTH ? THEMES.DARK : THEMES.LIGTH
    setTheme(toggledTheme)
    window?.localStorage.setItem(THEME_STORAGE, toggledTheme)
  }

  useEffect(() => {
    const actualTheme = window?.localStorage.getItem(THEME_STORAGE)
    actualTheme && setTheme(actualTheme)
  }, [])

  return (
    <ThemeProvider theme={theme[themeName]}>
      <GlobalStyles/>
      <Layout toogleTheme={toogleTheme}>
        <Component { ...pageProps } />
      </Layout>
    </ThemeProvider>
  )
}
