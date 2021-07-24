import React from 'react'
import Image from 'next/image'
import PropTypes from 'prop-types'

export default function BlogImage({ src, alt, width = '540px', height = '256px' }) {
  return (
    <Image
      alt={alt}
      src={src}
      width={width}
      height={height}
      placeholder='blur'
      blurDataURL='/assets/blur-placeholder.png'
    />
  )
}

BlogImage.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
}
