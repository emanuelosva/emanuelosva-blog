import React from 'react'
import Image from 'next/image'
import Container from '@/components/container'
import Divider from '@/components/divider'
import useTheme from '@/theme/useTheme'
import { FooterContainer } from './styles'

export default function Footer() {
  const { theme } = useTheme()
  return (
    <Container>
      <Divider/>
      <FooterContainer theme={theme}>
        <div className='copy-container'>
          <p>Copyrigth - {new Date().getFullYear()}</p>
        </div>
        <div className='social-container'>
          <a href='https://github.com/emanuelosva' target='_blank' rel='noopener noreferrer'>
            <Image alt='Github' src='/assets/icon-github.svg' width='40px' height='40px' />
          </a>
          <a href='https://twitter.com/emanuelosva' target='_blank' rel='noopener noreferrer'>
            <Image alt='Twitter' src='/assets/icon-twitter.svg' width='40px' height='40px' />
          </a>
        </div>
      </FooterContainer>
    </Container>
  )
}
