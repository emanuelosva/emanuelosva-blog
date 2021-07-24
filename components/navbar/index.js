import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import { Header } from './styles'

export default function NavBar({ toogleTheme }) {
  return (
    <Header>
      <button onClick={toogleTheme}></button>
      <nav>
        <Link href='/blog'>Blog</Link>
        <Link href='/about'>About</Link>
        <Link href='/home'>Home</Link>
      </nav>
    </Header>
  )
}

NavBar.propTypes = {
  toogleTheme: PropTypes.func.isRequired,
}
