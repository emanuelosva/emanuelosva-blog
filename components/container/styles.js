import styled from 'styled-components'

export const Container = styled.div`
  max-width: 790px;
  margin: 0 auto;
  padding: 0 5rem;
  padding: 0 6rem;
  background-color: ${props => props.color || 'inherith'};

  @media(max-width: 680px) {
    padding: 0 4rem;
  }

  @media(max-width: 420px) {
    padding: 0 3rem;
  }
`
