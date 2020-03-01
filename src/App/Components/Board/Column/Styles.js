import styled from 'styled-components';

import {
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../../Styles/SharedStyles';

export const Column = styled.div`
	display: flex;
	flex-direction: column;
	margin: 0 5px;
	padding: 0 5px 5px 5px;
	height: 100%;
	width: calc(20% - 20px);
	border-radius: 3px;
	background: ${color.siteBG3};
`;

export const WipLimit = styled.div`
	position: absolute;
	visibility: hidden;
	z-index: 6;
	padding: 4px;
	border-radius: ${length.radius};
	background-color: ${color.siteBG4};
	transform: translate(-32px, -54px);
	&::after {
		content: '  ';
		position: absolute;
		top: 100%;
		left: 50%;
		margin-left: -6px;
		border-width: 6px;
		border-style: solid;
		border-color: ${color.siteBG4} transparent transparent transparent;
	}
	& span {
		${font.text};
		font-size: 14px;
	}
`;

export const TaskCount = styled.span`
	margin: 10px 0 0 auto;
	color: ${(props) => (props.wipExceeded ? color.secondary : 'inherit')};
	&:hover {
		& ${WipLimit} {
			visibility: visible;
		}
	}
`;

export const ColumnList = styled.div`
	height: 100%;
	padding: 2px;
	border-radius: 4px;
	min-height: 20px;
	width: calc(100% - 4px);
	background-color: ${color.siteBG2};
`;

export const Dot = styled.div`
	height: 8px;
	width: 8px;
	border-radius: 5px;
	margin-right: 3px;
	background-color: ${color.siteBG4};
`;

export const ExpandOptions = styled.div`
	${layout.row};
	margin-bottom: ${length.margin};
	padding: 4px 0 4px 3px;
	${cursor.clickable};
	border-radius: 2px;
	width: fit-content;
	&:hover {
		background-color: ${color.siteBG2};
	}
`;

export const ColumnOptions = styled.div`
	background-color: ${color.siteBG2};
	transition: height 0.3s, margin-bottom 0.5s;
	border-radius: ${length.radius};
	height: ${(props) => (props.expanded ? '28px' : '0')};
	margin-bottom: ${(props) => (props.expanded ? length.margin : '0')};
	overflow: hidden;
`;

export const WipIncrease = styled.div`
	width: 0;
	height: 0;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;

	border-left: 10px solid ${color.siteBG3};
	transition: border-left-color 0.1s;
	&:hover {
		border-left-color: ${colorAdjust.darken(color.siteBG3, 0.1)};
	}
`;

export const WipDecrease = styled.div`
	width: 0;
	height: 0;
	margin-left: auto;
	border-top: 10px solid transparent;
	border-bottom: 10px solid transparent;

	border-right: 10px solid ${color.siteBG3};
	transition: border-right-color 0.1s;
	&:hover {
		border-right-color: ${colorAdjust.darken(color.siteBG3, 0.1)};
	}
`;

export const WipLimitToggler = styled.div`
	margin: 0 5px;
`;

export const WipLimitInput = styled.div`
	margin: 5px;
	${layout.row};
	& span {
		${font.text};
	}
`;

export const ColumnTitle = styled.input`
	padding: 4px 5px 5px;
	margin: 5px 0 0;
	text-transform: uppercase;
	border: none;
	font-size: 17px;
	color: ${color.primary};
	width: calc(100% - 70px);
	background: ${color.siteBG3};

	z-index: 3;
	&:hover {
		background: ${color.siteBG3};
	}
	&:focus {
		outline: none;
		background-color: ${color.siteBG1};
		border-radius: 4px;
	}
`;

export const AddTaskInput = styled.input`
	${components.input};
	background-color: ${color.siteBG1};
	margin: ${length.margin} 0;
`;
