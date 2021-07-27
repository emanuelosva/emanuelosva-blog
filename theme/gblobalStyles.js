import { createGlobalStyle } from "styled-components"

export const GlobalStyles = createGlobalStyle`
  #__next {
    position: relative;
    min-height: 100vh;
  }
  body {
    background-color: ${(props) => props.theme.backgroundColor};
    color: ${(props) => props.theme.color};
  }
`
