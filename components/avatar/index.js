import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'
import { AvatarContainer } from './styles'

export default function Avatar({ image, name }) {
  return (
    <AvatarContainer>
      <Image src={image} width='24px' height='24px' alt={name.split(' ')[0]} />
      <span>{name}</span>
    </AvatarContainer>
  )
}

Avatar.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
}
