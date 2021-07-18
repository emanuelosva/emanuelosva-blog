import styled from 'styled-components'

export const Divider = styled.div`
  width: ${props => props.width || '100%'};
  height: 1.2px;
  background-color: ${props => props.color || '#eaeaea'};
`
