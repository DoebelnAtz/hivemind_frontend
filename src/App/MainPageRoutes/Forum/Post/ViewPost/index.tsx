import React, { Fragment, useState } from 'react';

import Reply from './Reply/index';
import Comment from './Comment/index';
import { useDismiss, useRequest } from '../../../../../Hooks';
import { CommentSection, Comments, ReplyToThread } from './Styles';
import { CommentType, ViewPostProps } from '../../Types';
import { useLocation } from 'react-router-dom';
import queryString from 'query-string';
import { ShowAllCommentsButton } from './Styles';

const ShowComments: React.FC<ViewPostProps> = ({
	commentthread,
	focusList,
}) => {
	const location = useLocation();
	console.log(commentthread);
	const [commentThread, setCommentThread] = useState(
		queryString.parse(location.search)?.comment
			? Number(queryString.parse(location.search)?.comment)
			: commentthread,
	);
	const [comments, setComments, isLoading] = useRequest<CommentType[]>(
		`blogs/commentthread/${commentThread}`,
		'get',
	);
	const renderComments = (
		odd = true,
		comment = comments,
		isExpanded = true,
	) => {
		if (comment) {
			return comment.map((child: CommentType) => {
				return (
					<div key={child.c_id}>
						<Comment
							odd={odd}
							focusList={focusList}
							isExpanded={isExpanded}
							child={child}
							renderComments={renderComments}
						/>
					</div>
				);
			});
		} else {
			return <div>Loading...</div>;
		}
	};

	return (
		<CommentSection>
			<ReplyToThread />
			{!isLoading && (
				<Reply
					commentThread={comments}
					setCommentThread={setComments}
					childThreadId={commentthread}
				/>
			)}
			{commentthread !== commentThread && (
				<ShowAllCommentsButton
					onClick={() => {
						setCommentThread(commentthread);
					}}
				>
					All comments
				</ShowAllCommentsButton>
			)}

			<Comments>{!!comments?.length && renderComments()}</Comments>
		</CommentSection>
	);
};

export default ShowComments;