import styled from 'styled-components'

export const BlogCardContainer = styled.article`
  width: 100%;
  max-width: 320px;
  margin: 0 0.5rem 1rem 0;
  cursor: pointer;

  /* @TODO Verify card design */
  /* border: 1px solid var(--c-gray-divider);
  border-radius: 5px;

  .blog-content {
    padding: 0 1rem;
  } */

  a {
    width: 100%;
    margin: 0 auto;
    padding: 0;
  }

  h3 {
    margin-bottom: 0;
  }

  .blog-views {
    margin: 0.8rem 0 0.5rem;
    opacity: 0.6;
  }

  @media(max-width: 700px) {
    max-width: 420px;
  }
`
