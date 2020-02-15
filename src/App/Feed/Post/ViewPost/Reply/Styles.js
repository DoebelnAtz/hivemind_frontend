import styled from 'styled-components'
import { border, color, components, layout } from '../../../../../Styles/sharedStyles';

export const ReplyRow = styled.div`
	${layout.row};
	width: 100%;

`;

export const CancelButton = styled.button`
	${components.button};
	width: 70px;
	${border.setBorders(1, 0, 1, 1, color.primary)};
	border-radius: 4px 0 0 4px;
`;

export const SendButton = styled.button`
	${components.button};
	width: 60px;
	${border.setBorders(1, 1, 1, 0, color.primary)};
	border-radius: 0 4px 4px 0;
`;

export const CommentInput = styled.input`
	${components.input};
	position: relative;
	height: 34px;
	${border.setBorders(1, 1, 1, 1, color.primary)};
	border-radius: 0;

	width: calc(100% - 130px);
	background-color: ${color.siteBG3};
	border-color: ${color.primary};
	left: 0;
`;