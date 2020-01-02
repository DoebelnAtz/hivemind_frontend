import React, { useEffect, useState } from 'react';
import { useFetch, useNav } from "../Hooks/Hooks";
import ReconnectingWebSocket from 'reconnecting-websocket';
import TextArea from "../Components/TextArea";
import Button from "../Components/Buttons/Button";
import { useParams } from "react-router-dom";
import {makeRequest} from "../Api/Api";
import _ from 'lodash'
const Messages = (props) => {

    useNav('messages', props.setCurrentNav);
    let profile = JSON.parse(localStorage.getItem("currentUser"));
    let { user } = useParams();
    const [messages, setMessages] = useState([]);
    const [inputVal, setInputVal] = useState('');
    var loc = 'ws://127.0.0.1:8002/messages/' + user + '/?user=' + profile.username;
    var getSocket = (url) => {
        return new WebSocket(loc);
    };
    getSocket = _.memoize(getSocket);
    var socket = getSocket(loc);
    //var socket = new WebSocket('ws://127.0.0.1:8002/messages/' + user + '/?user=' + profile.username);
    const getMessages = async () => {
        let data = {
            username: profile.username,
            other_user: user
        };
        console.log(data);
        let resp = await makeRequest('message_thread/', 'POST',data,{
            "Content-Type": "application/json"
        });
        console.log(resp.data);
        if (resp.data)
            setMessages(resp.data.messages);
        console.log(messages)
    };
    useEffect(() => {
        getMessages()
    }, []);


    socket.onmessage = function (event) {
        console.log("message", event);
        var data = JSON.parse(event.data);
        setMessages([...messages, data]);
    };
    socket.onopen = function (event) {
        console.log("open", event);
    };

    socket.onclose = function (event) {
        console.log("close", event)
    };

    socket.onerror = function (event) {
        console.log("error", event)
    };


    const handleClick = async(event) => {
        event.preventDefault();
        var final_data = {
            'message': inputVal,
        };
        await socket.send(JSON.stringify(final_data));
        setInputVal('');
    };

    const renderMessages = () => {
        return (
            messages.map((message) => {
                return (
                    <div key={message.timestamp}>
                        {message.text}
                    </div>
                )
            })
        )
    };

    return (
        <div>
            <div className={'message_cont container'}>
                {renderMessages()}
                <textarea value={inputVal} onChange={(e) => setInputVal(e.target.value)}>
                </textarea>
                <Button onClick={(e) => handleClick(e)} text={'SEND'}/>
            </div>
        </div>
    )
};

export default Messages