import styled from 'styled-components'

export const FooterContainer = styled.footer`
  width: 100%;
  max-width: 790px;
  margin: 0 auto;
  padding: 0 1rem;
  color: ${props => props.theme.color};
  background-color: ${props => props.theme.backgroundColor};

  p {
    font-size: 18px;
    opacity: 0.8;
  }

  .footer-info-container {
    margin: 1rem auto;
    display: grid;
    grid-template-columns: 1fr 1fr;
    align-items: center;
  }

  .social-container {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .social-container a img {
    filter: ${props => props.theme.isDark ? 'invert(70%)' : 'none'};
  }

  @media(max-width: 680px) {
    margin: 2rem auto;
  }

  @media(max-width: 420px) {
    p {
      font-size: 14px;
    }
  }
`
