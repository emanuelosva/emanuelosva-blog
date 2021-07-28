import React from 'react'
import Link from 'next/link'
import PropTypes from 'prop-types'
import BlogImage from '@/components/blogImage'
import Container from '@/components/container'
import { BlogLinkSkeleton } from '@/components/blogSkeleton'
import useViews from '@/hooks/useViews'
import formatDateToString from '@/lib/formatDateToString'
import { BlogRelatedsContainer } from './styles'

export default function BlogRelateds({ blogs, isLoading }) {
  const renderLoadingSkeleton = () => (
    <>
      <BlogLinkSkeleton />
      <br />
      <BlogLinkSkeleton />
    </>
  )

  const renderRelatedBlogs = () => blogs?.map((blog) => (
    <RelatedBlog key={blog.slug} blog={blog} />
  ))

  return (
    <BlogRelatedsContainer>
    <h3>Ralated articles</h3>
      {
        isLoading
          ? renderLoadingSkeleton()
          : renderRelatedBlogs()
      }
    </BlogRelatedsContainer>
  )
}

function RelatedBlog({ blog }) {
  const { views } = useViews(blog.slug)

  return (
    <Link key={blog.slug} href={`/blog/${blog.slug}`} passHref>
      <a className='blog-container'>
        <div className='main-container'>
          <div className='title-container'>
            <h4>{blog.title}</h4>
            <div className='tags-container'>
              {blog.tags?.slice(0, 2)?.map((tag) => <span key={tag}>{tag}</span>)}
            </div>
          </div>
          <div className='meta-container'>
            <p className='author'>{blog.author.name}</p>
            <p className='meta'>{formatDateToString(blog.publishedAt)} • {views} views</p>
          </div>
        </div>
        <BlogImage
          src={blog.image.source}
          alt={blog.image.description}
          width='80px'
          height='80px'
        />
      </a>
    </Link>
  )
}

BlogRelateds.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  blogs: PropTypes.arrayOf(
    PropTypes.shape({
      slug: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      image: PropTypes.shape({
        source: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
      }).isRequired,
      author: PropTypes.shape({
        name: PropTypes.string.isRequired,
        image: PropTypes.string,
      }),
      tags: PropTypes.arrayOf(PropTypes.string).isRequired,
      publishedAt: PropTypes.string,
    })
  ),
}
