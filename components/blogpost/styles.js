import styled from 'styled-components'

export const Blog = styled.div`
  width: 100%;
  height: auto;
  margin: 0 auto 2rem auto;

  .blog-data {
    width: 100%;
    margin-top: 10px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: flex-end;
  }

  .blog-data p {
    font-size: 14px;
  }

  .blog-data__author-date {
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    font-size: 14px;
  }

  .blog-data__author-date span {
    margin-left: 8px;
  }

  h1 {
    margin: 0;
    font-size: 48px;
  }

  li {
    margin: 0.8rem 0;
  }

  figure {
    width: 100%;
    height: auto;
    margin: 2rem auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  figure img {
    width: 100%;
    height: auto;
    max-width: 790px;
    min-width: 320px;
    overflow: hidden;
  }

  figure p {
    margin: 0.5rem 0 0 0;
  }

  @media(max-width: 680px) {
    h1 {
      font-size: 30px;
    }
  }
`

export const Article = styled.article`
  margin: 2rem 0 3rem;

  p {
    font-size: 18px;
    line-height: 1.8rem;
  }

  img {
    max-width: 540px;
    align-self: center;
  }

  a {
    text-decoration: underline;
    color: #F7931A;
  }

  ul {
    padding: 0 0 0 2rem;
  }

  @media(max-width: 680px) {
    margin: 5rem 0;

    p {
      font-size: 16px;
      line-height: 1.5rem;
    }

    img {
      max-width: 320px;
    }

    ul {
      padding: 0 0 0 1rem;
    }
  }

  @media(max-width: 420px) {
    margin: 1rem 0;

    img {
      max-width: 200px;
    }
  }
`
