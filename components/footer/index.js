import React from 'react'
import Image from 'next/image'
import Container from '@/components/container'
import Divider from '@/components/divider'
import { FooterContainer } from './styles'

export default function Footer() {
  return (
    <FooterContainer>
      <Divider/>
      <div className='footer-info-container'>
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
      </div>
    </FooterContainer>
  )
}
