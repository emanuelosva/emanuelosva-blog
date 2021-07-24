import React from 'react'
import PropTypes from 'prop-types'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Container from '@/components/container'
import { Main } from './styles'

export default function Layout({ children, toogleTheme }) {
  return (
    <>
      <Navbar toogleTheme={toogleTheme} />
      <Main>
        <Container>
          {children}
        </Container>
      </Main>
      <Footer/>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
  toogleTheme: PropTypes.func.isRequired,
}
