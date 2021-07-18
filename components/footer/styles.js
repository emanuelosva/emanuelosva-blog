import styled from 'styled-components'

export const FooterContainer = styled.footer`
  max-width: 790px;
  margin: 0 auto;
  margin: 1.5rem auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  color: ${props => props.theme.color};

  p {
    font-size: 18px;
    opacity: 0.8;
  }

  .social-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .social-container a img {
    filter: ${props => props.theme.isDark ? 'invert(70%)' : 'none'};
  }

  @media(max-width: 420px) {
    p {
      font-size: 14px;
    }
  }
`
