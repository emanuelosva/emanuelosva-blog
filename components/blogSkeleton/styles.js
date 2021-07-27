import styled, { css } from 'styled-components'

export const BlogCardSkeletonContainer = styled.div``

export const BlogLinkSkeletonContainer = styled.div`
  position: relative;
  width: 100%;
  height: 180px;
  margin-bottom: 1rem;
  display: grid;
  grid-template-rows: 2fr 1fr;
  overflow: hidden;

  ::after {
    position: absolute;
    left: -100%;
    height: 180px;
    width: 10%;
    display: block;
    background: ${props => css`linear-gradient(to right, transparent 0%, ${props.theme.backgroundColor} 50%, transparent 100%);`};
    content: '';
    animation: loading 2s linear infinite;;
  }

  @keyframes loading {
    from {
      left: -100%;
    }
    to {
      left: 100%;
    }
  }

  .color-fill {
    background-color: var(--c-gray-divider);
  }

  .main-conatiner {
    width: 100%;
    display: grid;
    grid-template-columns: 3fr 1fr;
  }

  .main-conatiner .sk-image {
    height: 120px;
    width: 120px;
  }

  .main-conatiner .title-container {
    width: 90%;
    grid-template-rows: 2fr 1fr;
  }

  .main-conatiner .sk-title, .sk-tags-container {
    width: 100%;
    height: 50%;
  }

  .main-conatiner .sk-tags-container {
    display: flex;
    align-items: center;
  }

  .main-conatiner .sk-tag {
    width: 20%;
    height: 50%;
    margin-right: 10px;
    border-radius: 2px;
  }

  .meta-container {
    width: 100%;
    display: grid;
    grid-template-rows: 1fr 1fr;
  }

  .meta-container .sk-author, .sk-date {
    width: 60%;
    height: 60%;
    margin: auto 0;
  }

  .meta-container .sk-date {
    width: 40%;
  }

  @media(max-width:420px) {
    height: 120px;

    .main-conatiner .sk-image {
      height: 80px;
      width: 80px;
    }

    .main-conatiner .sk-tag {
      width: 30%;
    }
  }
`
