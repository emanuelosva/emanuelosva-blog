import styled, { css } from 'styled-components'

export const BlogpostLikesContainer = styled.div`
  width: 100%;
  height: auto;
  margin: -2rem auto 2rem 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  p {
    margin: -2rem 0 0;
    font-size: 24px;
    opacity: 0.7;
  }
`

export const Heart = styled.div`
  width: 140px;
  height: 140px;
  /* @TODO verify wich is better: url or static images */
  background-image: url('https://abs.twimg.com/a/1446542199/img/t1/web_heart_animation.png');
  background-position: left;
  background-repeat: no-repeat;
  background-size: 2900%;
  cursor: pointer;

  :hover {
    background-position: right;
  }

  ${props => props.isClicked && css`
    animation: heart_burst .8s steps(28) 1;
  `}

  @keyframes heart_burst {
    from { background-position:left; }
    to { background-position:right; }
  }
`
