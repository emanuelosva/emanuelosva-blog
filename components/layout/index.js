import React from 'react'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import Container from '@/components/container'
import useTheme from '@/theme/useTheme'
import { MainContainer } from './styles'

export default function Layout({ children }) {
  const { theme } = useTheme()
  return (
    <MainContainer theme={theme}>
      <Navbar/>
      <main>
        <Container>{children}</Container>
      </main>
      <Footer/>
    </MainContainer>
  )
}
