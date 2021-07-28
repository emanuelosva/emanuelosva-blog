import Head from 'next/head'
import config from '@/config'

export default function AboutPage() {
  return (
    <>
      <Head>
        <meta name='og:site_name' content={config.SITE_NAME} />
        <meta name='og:url' content={`${config.BASE_URL}/about`} />
        <meta name='og:type' content='website' />
        <meta name='og:title' content={`${config.SITE_TITLE} (About me)`} />
        <meta name='og:description' content='My description...' />
      </Head>
      <h1>About</h1>
      <br />
      <h3>🚧 Under construction... 🚧</h3>
    </>
  )
}
