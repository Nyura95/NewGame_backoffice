import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 450px;
  max-height: 90%;
  top: 15px;
  right: 15px;
  gap: 30px;
  z-index: 1000;
  &::-webkit-scrollbar {
    display: none;
  }
`
