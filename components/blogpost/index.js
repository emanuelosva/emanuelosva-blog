import React from 'react'
import Image from 'next/image'
import Container from '@/components/container'
import Avatar from '@/components/avatar'
import formateDateToString from '@/lib/formateDateToString'
import { Blog as BlogContainer, Article } from './styles'

export default function Blog({ title, publishedAt, author, minutesToRead, views, htmlSource, image }) {
  const date = formateDateToString(publishedAt)

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
            <Image placeholder='empty' src={image.source} width='540px' height='256px' alt={image.description || 'Cover image'} />
            {image.description && <p>{image.description}</p>}
          </figure>
        )}
        <Article dangerouslySetInnerHTML={{ __html: htmlSource }} />
      </BlogContainer>
    </Container>
  )
}
