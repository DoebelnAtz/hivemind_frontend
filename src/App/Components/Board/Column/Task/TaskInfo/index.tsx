import React, {
	useEffect,
	useRef,
	useState,
} from 'react';
import ReactDOM from 'react-dom';

import {
	OuterDiv,
	TaskDescription,
	TaskInfo,
	TaskTitle,
	TaskInfoHead,
	PriorityDropdown,
	TaskCollaborators,
	TaskFooter,
	TaskInfoBody,
	Collaborator,
	TaskSidebar,
	AddUserToTask,
	AddUserInput,
	AddUser,
	AddUserBtn,
	TaskTitleEditable,
} from './Styles';

import Plus from '../../../../../../Assets/Dots.png';
import { useDismiss, useRequest } from '../../../../../../Hooks/index';
import TextEditor from '../../../../TextEditor/index';
import Button from '../../../../Buttons/Button';
import { makeRequest } from '../../../../../../Api/Api';
import Avatar from '../../../../Avatar/index';
import { getPriorityIcon } from '../../../../../../utils/taskUtils/index';
import { RouteComponentProps, User } from '../../../../../../Types/index';
import { TaskType } from '../../../Types/index';
import DropDown from '../../../../DropDown/index';
import { checkUserList } from '../../../../../../utils/utils';
import SaveButton from '../../../../Buttons/SaveButton/index'
const BoardColumnTaskInfo: React.FC<RouteComponentProps<{
	tid: number;
	pid: number;
}>> = ({ match, history }) => {
	const getPriorityText = (priorityNum: number) => {
		switch (priorityNum) {
			case 0:
				return 'very low';
			case 1:
				return 'low';
			case 2:
				return 'medium';
			case 3:
				return 'high';
			default:
				return 'very high;';
		}
	};

	const getPriorityNumber = (priorityText: string) => {
		switch (priorityText) {
			case 'very low':
				return 0;
			case 'low':
				return 1;
			case 'medium':
				return 2;
			case 'high':
				return 3;
			default:
				return 4;
		}
	};

	const inside = useRef<HTMLDivElement>(null);

	const [task, setTask, isLoading] = useRequest<TaskType | null>(
		'projects/boards/tasks/' + match.params.tid,
		'get',
	);
	const [saveButtonText, setSaveButtonText] = useState('save');
	const [priorityInputVal, setPriorityInputVal] = useState<string>('');
	const [searchResult, setSearchResult] = useState([]);
	const [searchInput, setSearchInput] = useState<string>('');
	const [maxDisplayedUsers, setMaxDisplayedUsers] = useState<number>(3);
	const [priorityIcon, setPriorityIcon] = useState(getPriorityIcon(0));
	const [priority, setPriority] = useState(getPriorityText(0));

	useEffect(() => {
		if (task) {
			setPriorityIcon(getPriorityIcon(task.priority));
			setPriority(getPriorityText(task.priority));
		}
	}, [isLoading]);

	const close = () => {
		history.push(`/projects/${match.params.pid}`);
	};

	useDismiss(inside, close);

	const updateTask = async () => {
		if (task) {
			console.log(task);
			if (!task.description) {
				setTask({...task, description: ''})
			}
			let resp = await makeRequest('projects/boards/update_task', 'put', task);
			if (resp.data)
				return true;
		}
		return false;
	};

	const assignUserToTask = async (userId: number, taskId: number) => {
		let resp = await makeRequest('projects/boards/tasks/add_user', 'post', {
			userId,
			taskId,
		});
		if (task && resp?.data) {
			let updatedCollaborators: TaskType['collaborators'] = // We can access the type of collaborators
				resp.data.collaborators;
			let updatedTask: TaskType = {
				...task,
				collaborators: updatedCollaborators,
			};
			setTask(updatedTask);
			setSearchInput('');
			setSearchResult([]);
		}
	};

	const handlePrioritySelect = (e: string) => {
		if (task) {
			setPriority(e);
			setPriorityIcon(getPriorityIcon(getPriorityNumber(e)));
			setTask({ ...task, priority: getPriorityNumber(e) });
		}
	};

	const handleSearch = async (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setSearchInput(target.value);

		setSearchResult([]);
		if (target.value.length > 0) {
			let resp = await makeRequest(`users/search?q=${target.value}`, 'get');

			if (task && resp?.data) {
				setSearchResult(
					resp.data.filter((user: User) => {
						for (var i = 0; i < task.collaborators.length; i++) {
							if (task.collaborators[i].u_id === user.u_id)
								return false;
						}
						return true;
					}),
				);
			}
		}
	};

	const renderSearchResults = () => {
		return searchResult.map((user: User) => {
			return (
				<AddUser
					onClick={() =>
						task && assignUserToTask(user.u_id, task.task_id)
					}
					key={user.u_id}
				>
					<Avatar src={user.profile_pic} />
					<span>{user.username}</span>
					<AddUserBtn>+</AddUserBtn>
				</AddUser>
			);
		});
	};

	const renderTaskCollaborators = () => {
		if (task)
			return task.collaborators.map(
				(collaborator: User, index: number) => {
					if (
						index === maxDisplayedUsers &&
						task.collaborators.length > maxDisplayedUsers + 1
					) {
						return (
							<Collaborator
								key={collaborator.u_id}
								src={Plus}
								style={{ cursor: 'pointer' }}
								onClick={() =>
									setMaxDisplayedUsers(maxDisplayedUsers + 1)
								}
							/>
						);
					} else if (index > maxDisplayedUsers) {
						return <div key={collaborator.u_id} />;
					} else {
						return (
							<Collaborator
								key={collaborator.u_id}
								src={collaborator.profile_pic}
								alt={`${collaborator.username} profiled pic`}
								onClick={() => history.push(`/user/${collaborator.u_id}`)}
							/>
						);
					}
				},
			);
	};

	const handleDescriptionChange = (descVal: string) => {
		task && setTask({ ...task, description: descVal });
	};

	const handleTitleChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		task && setTask({ ...task, title: target.value });
	};

	return ReactDOM.createPortal(
		<OuterDiv>
			<TaskInfo ref={inside}>
				<TaskInfoHead>
					<TaskTitleEditable
						editable={task?.owner}
						onChange={(e: React.SyntheticEvent) =>
							handleTitleChange(e)
						}
						value={task?.title}
					/>
					<TaskTitle editable={task?.owner}>{task?.title}</TaskTitle>
					{task?.owner && (
						<SaveButton onClick={updateTask}>{saveButtonText}</SaveButton>
					)}
				</TaskInfoHead>
				<TaskInfoBody>
					<TaskDescription>
						{!isLoading && (
							<TextEditor
								editable={task?.owner}
								state={task?.description ?? ''}
								setState={(e: string) =>
									handleDescriptionChange(e)
								}
							/>
						)}
					</TaskDescription>
					<TaskSidebar>
						<TaskCollaborators>
							{!isLoading && renderTaskCollaborators()}
						</TaskCollaborators>
						{task && checkUserList(task.collaborators) && (<AddUserToTask>
							<AddUserInput
								style={{ width: '100%' }}
								value={searchInput}
								onChange={(e: React.SyntheticEvent) =>
									handleSearch(e)
								}
								placeholder={'add user'}
							/>
						</AddUserToTask>)}
						{!!searchResult.length && renderSearchResults()}
					</TaskSidebar>
				</TaskInfoBody>
				<TaskFooter>
					<img src={priorityIcon} />
					{task && checkUserList(task.collaborators) &&
					(<PriorityDropdown>
						<DropDown
							height={'34px'}
							optionList={[
								'very low',
								'low',
								'medium',
								'high',
								'very high',
							]}
							text={'Priority:'}
							state={priority}
							setSelect={handlePrioritySelect}
							width={'200px'}
						/>
					</PriorityDropdown>)
					}
				</TaskFooter>
			</TaskInfo>
		</OuterDiv>,
		document.querySelector('#modal') as Element,
	);
};

export default BoardColumnTaskInfo;