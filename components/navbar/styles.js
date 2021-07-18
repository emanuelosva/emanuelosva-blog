import styled from 'styled-components'

export const Header = styled.header`
  max-width: 906px;
  height: auto;
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.backgroundColor};

  button {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    background-color: ${props => props.theme.isDark ? '#1f2937' : '#e4e7eb'};
    border: none;
    border-radius: 4px;
    background-image: ${
      props => props.theme.isDark
        ? 'url("/assets/icon-theme-sun.png")'
        : 'url("/assets/icon-theme-moon.svg")'
    };
    background-position: center;
    background-repeat: no-repeat;
    background-size: 15px;
  };

  nav {
    display: flex;
  }

  a {
    margin: 12px;
    font-size: 18px;
    color: ${props => props.theme.color};
    opacity: 0.7;
  }

  @media(max-width: 680px) {
    padding: 2rem;
  }

  @media(max-width: 420px) {
    q {
      font-size: 14px;
    }
  }
`
