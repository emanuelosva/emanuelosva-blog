import Layout from '../components/layout'
import ThemeProvider from '../theme/themeProvider'
import '../styles/globals.css'

export default function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  )
}
