import styled, { css } from 'styled-components'

export const BlogsSearchContainer = styled.div`
  width: 100%;
  height: auto;
  min-height: 42px;
  margin: 1rem auto 3rem;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  background-image: url('/assets/icon-search.svg');
  background-repeat: no-repeat;
  background-position: calc(100% - 15px);
  background-size: 16px;
  border: 1px solid var(--c-gray-divider);
  border-radius: 4px;
  opacity: 0.8;

  ${props => props.seaching && css`
    border: 2px solid var(--c-many-orange);
  `}

  :hover {
    border: 2px solid var(--c-many-orange);
  }

  input {
    width: 90%;
    height: 100%;
    margin: 0;
    padding: 0;
    font-size: 16px;
    border: none;
    color: ${props => props.theme.color};
    background-color: transparent;
    border: none;
    outline: none;
  }

  input:focus {
    outline: none;
  }
`
