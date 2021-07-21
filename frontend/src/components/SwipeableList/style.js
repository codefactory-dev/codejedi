import styled, { css } from 'styled-components';
import theme from '../Material-UI Theme/Theme';

const Container = styled.div`
	box-sizing: border-box;
	position: relative;
	height: ${(props) => props.height}px;
	max-height: ${(props) => props.height + 10}px;
	${'' /* background-color: #262626; */}
	color: #F2F2F2;
	overflow: hidden;
`;

const Content = styled.div`
	position: relative;
	top: 0;
	right: 0;
	height: 100%;
	width: 100%;
	transform: translateX(${({ translate }) => translate}px);
	${(props) =>
		props.transition &&
		`transition: transform ${props.transitionDuration}ms ease-out`}
`;
const SwipeContent = styled.div`
	position: absolute;
	top: 0;
	right: 0;
	height: 100%;
	width: 100%;
	display: flex;
	justify-content: flex-start;
	align-items: center;
	background-color: ${(props) => theme.palette.common.black2};
	overflow-y: hidden;

	div {
		position: absolute;
		right: 0;
	}
`;

export { Container, Content, SwipeContent };
