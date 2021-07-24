import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { BlogsSearchContainer } from './styles'

export default function BlogsSearch({ handleChange }) {
  const [searching, setSearching] = useState(false)
  const handleClick = () => setSearching(!setSearching)

  return (
    <BlogsSearchContainer onInputCapture={handleClick} seaching={searching}>
      <input
        placeholder='Search articles'
        onChange={handleChange}
      />
    </BlogsSearchContainer>
  )
}

BlogsSearch.propTypes = {
  handleChange: PropTypes.func.isRequired,
}
