
import styled, { css } from 'styled-components'

const Container = styled.div`
    box-sizing: border-box;
    position: relative;
    background-color: #262626;
    color: #F2F2F2;
    height: ${props => props.height}px;
    max-height: ${props  => props.height + 10}px;
`;

const Content = styled.div`
  position: relative;
  height: 100%;
  width: 100%;
  transform: translateX(${({ translate }) => translate}px);
  ${props => props.transition && `transition: transform ${props.transitionDuration}ms ease-out`}
`
const SwipeContent = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  height: 100%;
  width: 100%;
  display: inline-flex;
  justify-content: flex-start;
  align-items: center;
  ${'' /* background-color: #aa0000; */}
  overflow-y: hidden;
  
  div {
      height: 100%;
      width: 100%;
      background-color: #3C3C3C;
      color: #00B5AD;
      transition: margin ${({ transitionDuration }) => transitionDuration}ms ease-out;
      margin-left: ${({ buttonMarginLeft }) => buttonMarginLeft}px;
  }
`

export {
    Container,
    Content,
    SwipeContent
};