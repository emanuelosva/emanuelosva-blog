import React from 'react'
import { Container as DivContainer } from './styles'

export default function Container({ children, color = 'inherit' }) {
  return (
    <DivContainer color={color}>
      {children}
    </DivContainer>
  )
}
