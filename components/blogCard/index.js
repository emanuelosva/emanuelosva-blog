import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import BlurImage from '@/components/blogImage'
import useViews from '@/hooks/useViews'
import { BlogCardContainer } from './styles'

export default function BlogCard({ slug, title, image, summary, minutesToRead }) {
  const { views } = useViews(slug)
  const textViews = views > 1 ? 'views' : 'view'

  return (
    <BlogCardContainer>
      <Link passHref href={`/blog/${slug}`}>
        <div className='blog-wrapper'>
          <BlurImage src={image.source} alt={image.description || title}/>
          <div className='blog-content'>
            <a href={`/blog/${slug}`}><h3>{title}</h3></a>
            <p className='blog-views'>{minutesToRead} min read • {views} {textViews}</p>
            <p className='blog-description'>{summary}</p>
          </div>
        </div>
      </Link>
    </BlogCardContainer>
  )
}

BlogCard.propTypes = {
  slug: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  image: PropTypes.shape({
    source: PropTypes.string,
    description: PropTypes.string,
  }),
  summary: PropTypes.string.isRequired,
  minutesToRead: PropTypes.number.isRequired,
}
