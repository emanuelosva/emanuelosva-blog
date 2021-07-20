import React from 'react'
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
