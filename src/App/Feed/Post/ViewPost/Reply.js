import React, { useState } from 'react'
import './viewpost.css'
import { makeRequest } from "../../../Api/Api";

export const Reply = (props) => {

    const [commentText, setCommentText] = useState('');
    const [opened, setOpened] = useState(false);

    const submitPost = async () => {
        let now = new Date().toISOString();
        if (commentText.length > 2) {
            await makeRequest('create_comment/', 'post',
                {
                    comment_text: commentText,
                    user_id: JSON.parse(localStorage.getItem('token')).id,
                    blog_id: props.blog_id,
                    comment_parent: props.comment_id,
                    published_date: now
                },
                {
                    'Content-Type': 'application/json'
                }
            );
        }
        setOpened(false)
    };
    if (!opened){
        return (
            <div>
                <button onClick={() => setOpened(true)}>Reply</button>
            </div>
        )
    } else {
        return (
            <div>
                <textarea className={'comment_textarea'} value={commentText}
                          onChange={(e) => setCommentText(e.target.value)}/>
                <button onClick={() => submitPost()}>Reply</button>
            </div>
        )
    }
};