import React from 'react'
import { Container as DivContainer } from './styles'

export default function Container({ children }) {
  return (
    <DivContainer>
      {children}
    </DivContainer>
  )
}
