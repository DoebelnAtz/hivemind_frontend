import React, { Dispatch, SetStateAction, Fragment, useState } from 'react';
import { useRequest } from '../../../../Hooks';
import { ResourceListType } from '../Types';
import { makeRequest } from '../../../../Api/Api';
import { getLocal } from '../../../../utils/utils';
import ResourceCard from '../ResourceCard/index';
import { useHistory } from 'react-router-dom';
import { LoadButton } from '../Styles';
import { MoreButton } from '../../Forum/ForumFeed/Styles';
import PlusIcon from '../../../../Assets/Plus.png';

type ResourceFeedPropTypes = {
	pagination: number;
	reverse: string;
	sortBy: string;
	filterBy: string;
	setFilter: Dispatch<SetStateAction<string>>;
	resources: ResourceListType[];
	setResources: Dispatch<SetStateAction<ResourceListType[] | undefined>>;
};

const ResourcesResourceFeed: React.FC<ResourceFeedPropTypes> = ({
	pagination,
	reverse,
	sortBy,
	filterBy,
	setFilter,
	resources,
	setResources,
}) => {
	const history = useHistory();

	const [nextResources, setNextResources, isLoading] = useRequest<
		ResourceListType[]
	>(
		`resources?page=${pagination}&filter=${filterBy}&order=${sortBy}&reverse=${reverse}`,
		'get',
		{},
		resources.length >= 10,
	);
	const [next, setNext] = useState(false);
	const deleteResource = async (rId: number) => {
		if (resources) {
			let deleted = await makeRequest(
				'resources/delete_resource',
				'delete',
				{
					userId: getLocal('token').user.u_id,
					resourceId: rId,
				},
			);
			if (deleted?.data?.success) {
				setResources(
					resources.filter(
						(resource: ResourceListType) => resource.r_id !== rId,
					),
				);
			}
		}
	};

	const renderResources = (rList: ResourceListType[]) => {
		if (!!resources)
			return rList.map((resource: ResourceListType) => {
				return (
					<ResourceCard
						key={resource.r_id}
						resource={resource}
						openResource={() =>
							history.push(`/resources/${resource.r_id}`)
						}
						deleteResource={() => deleteResource(resource.r_id)}
						setFilter={setFilter}
						filter={filterBy}
					/>
				);
			});
	};
	return (
		<Fragment>
			{resources && renderResources(resources)}
			{next && nextResources && setNextResources && (
				<ResourcesResourceFeed
					pagination={pagination + 1}
					reverse={reverse}
					sortBy={sortBy}
					filterBy={filterBy}
					setFilter={setFilter}
					resources={nextResources}
					setResources={setNextResources}
				/>
			)}
			{!next && resources.length >= 10 && (
				<MoreButton>
					<img
						src={PlusIcon}
						alt={'load more posts'}
						onClick={() => setNext(true)}
					/>
				</MoreButton>
			)}
		</Fragment>
	);
};

export default ResourcesResourceFeed;