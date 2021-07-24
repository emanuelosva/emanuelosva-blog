import React from 'react'
import PropTypes from 'prop-types'
import BlurImage from '@/components/blogImage'
import Container from '@/components/container'
import Avatar from '@/components/avatar'
import formatDateToString from '@/lib/formatDateToString'
import { Blog as BlogContainer, Article } from './styles'

export default function Blog({ title, publishedAt, author, minutesToRead, views, htmlSource, image }) {
  const date = formatDateToString(publishedAt)

  return (
    <Container>
      <BlogContainer>
        <h1>{title}</h1>
        <section className='blog-data'>
          <div className='blog-data__author-date'>
            <Avatar image={author.image} name={author.name}/>
            <span>{' '} / {date}</span>
          </div>
          <p>{minutesToRead} min read • {views} views</p>
        </section>
        { image?.source && (
          <figure>
            <BlurImage
              src={image.source}
              alt={image.description || title}
            />
            {image.description && <p>{image.description}</p>}
          </figure>
        )}
        <Article dangerouslySetInnerHTML={{ __html: htmlSource }} />
      </BlogContainer>
    </Container>
  )
}

Blog.propTypes = {
  slug: PropTypes.string,
  title: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string),
  publishedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  summary: PropTypes.string,
  author: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
  image: PropTypes.shape({
    source: PropTypes.string,
    description: PropTypes.string,
  }),
  minutesToRead: PropTypes.number,
  numberOfWords: PropTypes.number,
  htmlSource: PropTypes.string.isRequired,
}
