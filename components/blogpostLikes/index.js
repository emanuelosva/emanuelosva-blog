import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import Container from '@/components/container'
import useLikes from '@/hooks/useLikes'
import Api from '@/lib/apiCaller'
import { BlogpostLikesContainer, Heart } from './styles'

export default function BlogpostLikes({ slug }) {
  const { likes, isLoading } = useLikes(slug)
  const [likesCount, setLikesCount] = useState(likes)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    setLikesCount(likes)
  }, [likes, isLoading])

  const handleEndAnimation = () => {
    setIsClicked(true)
    setTimeout(() => setIsClicked(false), 800)
  }
  const handleClick = () => {
    handleEndAnimation()
    setLikesCount(likesCount + 1)
    Api.incrementLikes(slug)
  }

  return (
    <Container>
      <BlogpostLikesContainer>
        <Heart
          isClicked={isClicked}
          onClick={handleClick}
        />
        <p>{isLoading ? 'Cargando...' : likesCount}</p>
      </BlogpostLikesContainer>
    </Container>
  )
}

BlogpostLikes.propTypes = {
  slug: PropTypes.string.isRequired,
}
