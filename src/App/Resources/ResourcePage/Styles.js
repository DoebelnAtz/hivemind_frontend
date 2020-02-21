import styled from 'styled-components';
import {
	border,
	color,
	colorAdjust,
	components,
	cursor,
	font,
	layout,
	length,
} from '../../../Styles/sharedStyles';
import { animated } from 'react-spring';

export const OutsideDiv = styled(animated.div)`
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	margin: auto;
	background-color: rgba(0, 0, 0, 0.5);
	z-index: 2;
`;

export const ModalDiv = styled(animated.div)`
	position: absolute;
	left: 15%;
	right: 15%;
	top: 15%;
	min-height: 50%;
	height: auto;
	max-height: 80%;

	overflow-y: auto;
	color: ${color.primary};
	border: 5px solid ${color.siteBG2};
	border-radius: 2px;
	margin: auto;
	background: ${color.siteBG2};
	z-index: 3 !important;
	display: flex;
	flex-direction: column;
`;

export const ResourcePage = styled.div`
	width: 100%;
	min-height: 100%;
	height: 100%;
`;

export const ResourceHeader = styled.div`
	${layout.col};
`;

export const ResourceTitle = styled.div`
	${layout.row};
	${font.title};
	padding-right: 50px;
	font-size: 28px;
	margin: 0 0 0 ${length.margin};
	color: ${color.primary};
	& :hover {
		text-decoration: none;
	}
	& a {
		${font.link};
	}
`;

export const SaveButton = styled.button`
	position: absolute;
	right: 0;
	margin: ${length.margin} ${length.margin} ${length.margin} auto;
	${components.button};
`;

export const ResourceTags = styled.div`
	${layout.row};
	margin: ${length.margin} ${length.margin} 0 ${length.margin};
`;

export const ResourceContent = styled.div`
	width: calc(100% - ${length.margin} * 2);
	min-height: 50%;
	height: 50%;
	padding: ${length.margin} 0;
	${border.setBorders(4, 0, 4, 0, color.siteBG1)};

	margin: ${length.margin};
	${layout.row};
`;

export const AddTagInput = styled.input`
	${components.input};
	width: calc(100% - ${length.margin} - 3px);
	margin-left: ${length.margin};
`;

export const ResourceTag = styled.div`
	z-index: 2;
	margin-right: ${(props) => (props.owner ? '14px' : '8px')};
	border-radius: ${(props) => (props.owner ? '4px 0 0 4px' : '4px')};
	background-color: ${(props) => props.color};
	${font.text};
	height: calc(34px - 8px);
	line-height: 26px;
	${layout.row};
	padding: 4px 8px;
`;

export const DeleteTagButton = styled.div`
	display: ${(props) => (props.owner ? 'block' : 'none')};
	background-color: ${(props) => props.color};
	border-radius: 0 4px 4px 0;
	border-left: 1px solid ${color.siteBG2};
	width: 30px;
	height: 34px;
	position: relative;
	top: -4px;
	right: -12px;
	font-size: 16px;
	line-height: 34px;
	${cursor.clickable};
	text-align: center;
	&:hover {
		background-color: ${(props) => colorAdjust.darken(props.color, 0.1)};
	}
`;

export const SearchResultTag = styled.div`
	z-index: 2;
	margin: 10px;
	${layout.row};
	background-color: ${(props) => props.color};
	${font.text};
	height: 34px;
	padding: 4px 8px;
	width: calc(100% - 16px);
	border-radius: 4px;
	& span {
		${cursor.clickable};
		line-height: 34px;
		&:hover {
			color: lightgray;
		}
	}
`;

export const TagSearchResults = styled.div`
	width: calc(40% - ${length.margin});
`;

export const ResourceDescription = styled.div`
	${font.text};
	min-height: 50%;
	height: 400px;
	background-color: ${color.siteBG3};
	width: calc(${(props) => (props.full ? '100%' : '60%')});
`;

export const ResourceComments = styled.div`
	margin: ${length.margin};
	width: calc(100% - ${length.margin} * 2);
`;
