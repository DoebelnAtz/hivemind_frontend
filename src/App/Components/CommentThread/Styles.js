import styled from 'styled-components';

import {
	border,
	color,
	colorAdjust,
	components,
	length,
} from '../../../Styles/sharedStyles';

export const CommentSection = styled.div`
	margin: ${length.margin} 0;
	color: ${color.primary};
	background-color: ${color.siteBG2};
`;

export const ReplyToThread = styled.div``;

export const ShowAllCommentsButton = styled.button`
	${components.button};
	margin: ${length.margin} 0 0 ${length.margin};
	height: 34px;
`;

export const Comments = styled.div`
	margin-left: -${length.margin};
`;