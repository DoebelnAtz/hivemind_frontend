import React, {useState} from 'react'
import BoardItem from './BoardItem'
import _ from 'lodash'
import { Task } from './Task'



import './boards.css'

const tasklist1 = [{id: 1, text:"Task #1"}, {id: 2, text: "Task #2"}, {id: 3, text: "Task #3"}, {id: 8, text: 'Done', spacer: true}];
const tasklist2 = [{id: 4, text:"Task #4"}, {id: 5, text: "Task #5"}, {id: 6, text: "Task #6"}, {id: 7, text: "Task #7"}, {id: 9, text: 'Done', spacer: true}];
const tasklist3 = [{id: 10, text: 'Done', spacer: true}]; // Bugfix turned into a feature
const tasklist4 = [{id: 10, text: 'Done', spacer: true}];
const tasklist5 = [{id: 10, text: 'Done', spacer: true}];
const columnList = [
    {id: 1, title: 'Backlog', taskList: tasklist1.map(task => task.id)},
    {id: 2, title: 'Breakdown', taskList: tasklist2.map(task => task.id)},
    {id: 3, title: 'In Development', taskList: tasklist3.map(task => task.id)},
    {id: 4, title: 'Testing', taskList: tasklist4.map(task => task.id)},
    {id: 5, title: 'Implementing', taskList: tasklist5.map(task => task.id)}
    ];

export default () => {
    const [tasks, setTasks] = useState([...tasklist1, ...tasklist2, ...tasklist3, ...tasklist4, ...tasklist5]);
    const [columns, setColumns] = useState(columnList);

    const moveTask = (taskId, destColumn, index) => {
        setColumns(columns.map(column => ({
            ...column, taskList: _.flow(
                ids => ids.filter(id => id !== taskId),
                ids =>
                    column.id === destColumn
                        ? [...ids.slice(0, index), taskId, ...ids.slice(index)]
                        : ids,
            )(column.taskList),
            })),
        );
    };

        return (
            <div id={"boards_main"}>
                <div className={'board_cont'}>
                    <BoardItem moveTask={moveTask} columns={columns} tasks={tasks} className={'board'}/>
                </div>
            </div>
        )

}