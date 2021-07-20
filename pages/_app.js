import { useState } from 'react'
import { ThemeProvider } from 'styled-components'
import Layout from '@/components/layout'
import { theme, THEMES, GlobalStyles } from '@/theme'
import '@/styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  const [themeName, setTheme] = useState(THEMES.LIGTH)
  const toogleTheme = () => setTheme(themeName === THEMES.LIGTH ? THEMES.DARK : THEMES.LIGTH)

  return (
    <ThemeProvider theme={theme[themeName]}>
      <GlobalStyles/>
      <Layout toogleTheme={toogleTheme}>
        <Component { ...pageProps } />
      </Layout>
    </ThemeProvider>
  )
}
