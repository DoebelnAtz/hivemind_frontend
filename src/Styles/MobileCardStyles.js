import styled from 'styled-components';
import {length, color, layout, font, cursor, colorAdjust} from './SharedStyles';



export const MobileCard = styled.div`
	${font.text};
	${layout.row};
	width: calc(100%);
	border-radius: 8px;
	z-index: 1;
	background-color: ${color.siteBG2};
	margin: ${length.margin} 0;
`;

export const MobileCardContainer = styled.div`
	${layout.col};
`;

export const MobileCardVotes = styled.div`
	width: 55px;
	padding: 14px 0;
	border-right: 2px solid ${color.siteBG1};
	${layout.col};
	@media (min-width: 1367px) {
		width: calc(50% - 20px);
	}
`;



export const MobileArrowImage = styled.div`
	${layout.row};
	& img {
		height: 24px;
		width: 24px;
		margin: 0 auto;
		${cursor.clickable};
	}
`;

export const MobileVoteCount = styled.div`
	${layout.row};
	margin: auto ${length.margin};
	& span {
		user-select: none;
		text-align: center;
		letter-spacing: 0;
		margin: 0 auto;
	}
`;

export const MobileCardContent = styled.div`
	width: calc(100% - ${length.margin} * 2);
	padding: 10px;
	display: flex;
	min-height: 50px;
	flex-direction: column;
	${cursor.clickable};
	z-index: 1;
	&:hover {
		background-color: ${colorAdjust.darken(color.siteBG2, 0.15)};
	}
`;

export const MobileCardThumbnailTitle = styled.div`
	${layout.row};
	margin-bottom: ${length.margin};
`;

export const MobileCardTitleInfo = styled.div`
	${layout.col};
`;

export const MobileCardInfo = styled.div`
	${layout.row};
	padding: ${length.margin};
	width: calc(100% - ${length.margin} * 2);
	font-size: 14px;
	border-bottom: 2px solid ${color.siteBG1};
`;

export const MobileCardTitle = styled.span`
	${layout.row};
	font-size: 16px;
	width: calc(100%);
`;

export const MobileCardEdited = styled.span`
	${layout.row};
	${font.text};
	margin-top: auto;
	
	width: calc(100% - ${length.margin} * 2);
	font-size: 12px;
`;

export const MobileCardThumbnail = styled.div`
	width: 58px;
	height: 58px;
	margin-right: ${length.margin};
	border-radius: ${length.radius};
	background-image: url(${(props) => props.src});
	background-size: 58px;
	background-repeat: no-repeat;
	background-position: center;
	background-color: ${color.siteBG1};
`;

export const MobileCardAuthor = styled.div`
	${layout.row};
	${font.text};
	font-size: inherit;
	margin-right: auto;
	${font.text};
`;

export const MobileCardDate = styled.span`
	margin-left: auto;
	padding-left: 10px;
	text-align: right;
	${layout.row};
	${font.text};
`;

export const MobileCardButtons = styled.div`
	width: calc(100% - ${length.margin} * 2);
	padding: 5px ${length.margin};
	${layout.row};
	border-top: 2px solid ${color.siteBG1};
`;

export const MobileDeleteButton = styled.div`
	${layout.row};
	margin: auto 0 auto 20px;
	& img {
		${cursor.clickable};
		height: 24px;
		border-radius: 50%;
		background-color: ${color.siteBG2};
		transition: background-color 0.2s;
		&:hover {
			background-color: ${color.siteBG1};
		}
	}
`;

export const MobileSaveButton = styled.div`
	${layout.row};
	margin: auto 0 auto 20px;
	& img {
		${cursor.clickable};
		height: 24px;
		border-radius: 50%;
		background-color: ${color.siteBG2};
		transition: background-color 0.2s;
		&:hover {
			background-color: ${color.siteBG1};
		}
	}
`;

export const MobileShareButton = styled.div`
	${layout.row};
	margin: auto 0 auto ${length.margin};
	& img {
		${cursor.clickable};
		height: 24px;
		width: 24px;
		border-radius: 50%;
		background-color: ${color.siteBG2};
		transition: background-color 0.2s;
		&:hover {
			background-color: ${color.siteBG1};
		}
	}
`;

export const MobileCopiedSpan = styled.span`
	position: relative;
	bottom: 0;
	margin: auto 0 auto auto;
	transition: opacity 0.3s;
	user-select: none;
	opacity: ${(props) => (props.copied ? '1' : '0')};
	@media (max-width: 768px) {
		font-size: 12px;
	}
`;