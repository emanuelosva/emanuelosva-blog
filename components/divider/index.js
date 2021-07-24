import React from 'react'
import PropTypes from 'prop-types'
import { Divider as DivDivider } from './styles'

export default function Divider({ width, color }) {
  return (
    <DivDivider width={width} color={color}/>
  )
}

DivDivider.propTypes = {
  width: PropTypes.string,
  color: PropTypes.string,
}
