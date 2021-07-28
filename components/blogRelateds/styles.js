import styled from 'styled-components'

export const BlogRelatedsContainer = styled.section`
  width: 100%;
  height: auto;
  margin: 1rem auto 2rem;
  padding: 0 5px;

  h3 {
    width: fit-content;
    padding-bottom: 0.5rem;
    margin-bottom: 1.5rem;
    border-bottom: 1px solid var(--c-gray-divider);
  }

  a {
    cursor: pointer;
  }

  .blog-container {
    height: 160px;
    margin: 2rem 0;
    display: grid;
    grid-template-columns: 1.5fr 1fr;
    /* @TODO verify design */
    /* border-top: 1px solid var(--c-gray-divider);
    border-bottom: 1px solid var(--c-gray-divider); */
  }

  .main-container {
    display: grid;
    grid-template-rows: 1.5fr 1fr;
  }

  .blog-container img {
    height: 120px;
    width: 120px;
    max-height: 120px;
  }

  .blog-container h4 {
    margin: 0 auto 0.5rem;
  }

  .blog-container .tags-container {
    display: flex;
    padding-right: 1rem;
  }

  .blog-container .tags-container span {
    margin: 4px;
    margin-left: 0;
    padding: 2px 4px;
    color: var(--c-many-orange);
    background-color: var(--c-gray-divider);
    border-radius: 4px;
  }

  .blog-container .meta-container {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
  }

  .blog-container .meta-container p {
    margin: 0;
  }

  .blog-container .meta-container .author {
    font-weight: 600;
  }

  @media(max-width: 420px) {
    .blog-container {
      height: 120px;
      grid-template-columns: 1fr 0fr;
    }

    .blog-container img {
      height: 80px;
      width: 80px;
    }

    .blog-container .meta-container p {
      font-size: 0.8rem;
    }
  }
`
