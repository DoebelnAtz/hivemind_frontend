import React, { Fragment, useState } from 'react';

import Reply from './Reply';
import { useRequest } from '../../../Hooks';
import { CommentSection, Comments, ReplyToThread } from './Styles';
import { CommentType } from '../../MainPageRoutes/Forum/Types';
import { useLocation, useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { ShowAllCommentsButton } from './Styles';
import { FocusList } from '../../../Types';
import CommentFeed from './CommentFeed';
import { ReplyRow, ShowRepliesButton } from './Comment/Styles';
import { RowDiv } from '../../../Styles/LayoutStyles';

type CommentThread = {
	commentthread: number;
	focusList: FocusList;
	OPAuthorId: number;
};

const ShowComments: React.FC<CommentThread> = ({
	commentthread,
	focusList,
	OPAuthorId,
}) => {
	const location = useLocation();
	const history = useHistory();
	const [expanded, setExpanded] = useState(false);
	const [commentThread, setCommentThread] = useState(
		queryString.parse(location.search)?.comment
			? Number(queryString.parse(location.search)?.comment)
			: commentthread,
	);
	const [comments, setComments, isLoading] = useRequest<CommentType[]>(
		`blogs/commentthread/${commentThread}?page=1`,
		'get',
	);

	return (
		<CommentSection>
			<RowDiv>
				<ShowRepliesButton onClick={() => setExpanded(!expanded)}>
					<i
						style={{ fontSize: '13px', marginRight: '5px' }}
						className="fas fa-comment-alt"
					/>
					{!expanded ? 'Show' : 'Hide'}
				</ShowRepliesButton>
				<ReplyRow full={!!comments?.length}>
					<Reply
						commentThread={comments}
						expandChildThread={setExpanded}
						setCommentThread={setComments}
						childThreadId={commentthread}
						OPAuthorId={OPAuthorId}
					/>
				</ReplyRow>
			</RowDiv>
			{commentthread !== commentThread && (
				<ShowAllCommentsButton
					onClick={() => {
						history.push(`${location.pathname}`);
						setCommentThread(commentthread);
					}}
				>
					All comments
				</ShowAllCommentsButton>
			)}
			<Comments>
				{expanded && comments && (
					<CommentFeed
						comments={comments}
						commentThread={commentThread}
						page={2}
						focusList={focusList}
					/>
				)}
			</Comments>
		</CommentSection>
	);
};

export default ShowComments;
