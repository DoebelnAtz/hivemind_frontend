import React, { useState, useRef } from 'react';
import { useRequest, useWidth, useNav } from '../../../Hooks';
import CreatePostModal from './CreatePostModal/index';
import { PostType } from './Types';
import { FeedPage, FeedButtonRow, CreatePostButton } from './Styles';
import DropDown from '../../Components/DropDown/index';
import ForumFeed from './ForumFeed/index';
import PlaceHolderFeed from '../../Components/PlaceHolderFeed/index';
import { getLocal, setLocal } from '../../../Utils';

const Feed = () => {
	const [popup, setPopup] = useState(false);

	const isMounted = useRef(true);

	const [sortBy, setSortBy] = useState(
		getLocal('forumSortPref')?.sortBy || 'popular',
	);
	const [reverse, setReverse] = useState(
		getLocal('forumSortPref')?.reverse || 'false',
	);

	const [posts, setPosts] = useRequest<PostType[]>(
		`blogs?page=1&order=${sortBy}&reverse=${reverse}`,
		'get',
	);
	const [width, isMobile] = useWidth();
	useNav('forum');
	const onSortSelect = (sort: string) => {
		if (sort === sortBy) {
			// Save sorting preference to localstorage
			setLocal('forumSortPref', {
				sortBy: sort,
				reverse: reverse === 'true' ? 'false' : 'true',
			});
			setReverse(reverse === 'true' ? 'false' : 'true');
		} else {
			setLocal('forumSortPref', { sortBy: sort });
			setReverse('false');
			setSortBy(sort);
		}
	};

	return (
		<FeedPage>
			<FeedButtonRow>
				<CreatePostButton
					width={isMobile ? `calc(${width}px / 2 - 15px)` : `160px`}
					onClick={() => setPopup(true)}
				>
					Submit Post
				</CreatePostButton>
				<DropDown
					state={sortBy}
					setSelect={onSortSelect}
					text={`${reverse === 'false' ? '▼' : '▲'} Sort by: `}
					optionList={['popular', 'recent', 'title']}
					height={'32px'}
					width={isMobile ? `calc(${width}px / 2 - 15px)` : `160px`}
				/>
			</FeedButtonRow>
			{popup &&
			<CreatePostModal
				popup={popup}
				posts={posts}
				setPosts={setPosts}
				setPopup={setPopup}
				isMounted={isMounted}
			/>
			}
			{(posts && (
				<ForumFeed
					reverse={reverse}
					sortBy={sortBy}
					page={2}
					posts={posts}
					setPosts={setPosts}
				/>
			)) || <PlaceHolderFeed />}
		</FeedPage>
	);
};

export default Feed;
