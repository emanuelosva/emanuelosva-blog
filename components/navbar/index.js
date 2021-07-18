import React from 'react'
import Link from 'next/link'
import useTheme from '@/theme/useTheme'
import { Header } from './styles'

export default function NavBar() {
  const { theme, toogleTheme } = useTheme()

  return (
    <Header theme={theme}>
      <button onClick={toogleTheme}></button>
      <nav>
        <Link href='/blog'>Blog</Link>
        <Link href='/about'>About</Link>
        <Link href='/'>Home</Link>
      </nav>
    </Header>
  )
}
