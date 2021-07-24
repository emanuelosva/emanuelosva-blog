import React from 'react'
import PropTypes from 'prop-types'
import BlogCard from '@/components/blogCard'
import { BlogListContainer } from './styles'

export default function BlogList({ blogs }) {
  return (
    <BlogListContainer>
      { blogs.map(({ slug, title, image, summary, minutesToRead }) => (
        <BlogCard
          key={slug}
          slug={slug}
          title={title}
          image={image}
          summary={summary}
          minutesToRead={minutesToRead}
        />
      ))}
    </BlogListContainer>
  )
}

BlogList.propTypes = {
  blogs: PropTypes.arrayOf(PropTypes.shape({
    slug: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    tags: PropTypes.arrayOf(PropTypes.string),
    publishedAt: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    summary: PropTypes.string.isRequired,
    image: PropTypes.shape({
      source: PropTypes.string,
      description: PropTypes.string,
    }).isRequired,
    author: PropTypes.shape({
      name: PropTypes.string,
      image: PropTypes.string,
    }),
    minutesToRead: PropTypes.number.isRequired,
    numberOfWords: PropTypes.number,
  })),
}
