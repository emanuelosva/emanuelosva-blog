import styled from 'styled-components'

export const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 3;
  width: 100%;
  max-width: 906px;
  height: auto;
  margin: 0 auto;
  padding: 3rem;
  display: flex;
  justify-content: space-between;
  background-color: ${props => props.theme.backgroundColor};
  opacity: ${props => props.theme.isDark ? '0.93' : '0.96'};

  button {
    width: 40px;
    height: 40px;
    margin: auto 10px auto 0;
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
    padding-bottom: 5px;
    font-size: 18px;
    color: ${props => props.theme.color};
    /* @TODO verify this style (Design) */
    border-bottom: 3px solid var(--c-many-orange);
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
