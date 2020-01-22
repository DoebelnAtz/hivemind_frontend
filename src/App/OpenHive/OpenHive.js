import React, { Component, useContext, useEffect, useState } from 'react'

import { makeRequest } from "../Api/Api";
import './open_hive.css'
import { useNav } from "../../Hooks/Hooks";

const Projects = (props) => {


    const [projects, setProjects] = useState([]);
    useEffect(() => {
        getProjects();
    }, []);

    useNav('Open Hive');


    const getProjects = async () => {
        let resp = await makeRequest('projects', 'get');
        if (resp)
            setProjects(resp.data);
    };

    const renderProjects = () => {
        return (
            projects.map(project => {
                return (
                    <div
                        key={project.project_id}
                        className={'project_item'}
                    >
                        {project.title}
                    </div>
                )
            })
        )
    };

    return (
        <div className={'project_list'}>
            {renderProjects()}
        </div>
    )
};

export default Projects