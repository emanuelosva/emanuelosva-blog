import React from 'react'
import PropTypes from 'prop-types'
import { Container as DivContainer } from './styles'

export default function Container({ children }) {
  return (
    <DivContainer>
      {children}
    </DivContainer>
  )
}

Container.propTypes = {
  children: PropTypes.element,
}
