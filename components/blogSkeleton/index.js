import React from 'react'
import { BlogLinkSkeletonContainer } from './styles'

export function BlogLinkSkeleton() {
  return (
    <BlogLinkSkeletonContainer>
      <div className='main-conatiner'>
        <div className='title-container'>
          <div className='sk-title color-fill' />
          <div className='sk-tags-container'>
            <div className='sk-tag color-fill' />
            <div className='sk-tag color-fill' />
          </div>
        </div>
        <div className='sk-image color-fill' />
      </div>
      <div className='meta-container'>
        <div className='sk-author color-fill' />
        <div className='sk-date color-fill' />
      </div>
    </BlogLinkSkeletonContainer>
  )
}
