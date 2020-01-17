import React, { useEffect, useState, useRef } from 'react';
//import ReconnectingWebSocket from 'reconnecting-websocket';
import { useParams } from "react-router-dom";
import _ from 'lodash'

import { useNav } from "../Hooks/Hooks";
import Button from "../Components/Buttons/Button";
import { makeRequest } from "../Api/Api";
import './messages.css'
import {calculateTimeSince, getLocal} from "../../utils/utils";

import socketIOClient from "socket.io-client";
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import withStyles from "@material-ui/core/styles/withStyles";
import AddToChat from "../Components/Buttons/AddToChat";


class Messages extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [],
            connected: false,
            inputVal: '',
            addUserInputVal: '',
            searchResults: {},
            connectedUsers: [],
            activeUsers: [],
        };
        this.scrollDown = React.createRef();
    }

    profile = JSON.parse(localStorage.getItem("currentUser"));
    socket;
    tid = this.props.match.params.tid;


    componentDidMount() {
        this.socket = socketIOClient('http://localhost:5010', {
            transportOptions: {
                polling: {
                    extraHeaders: {
                        "Authorization": "Bearer " + getLocal('token').token
                    }
                }

            }
        });
        this.getMessages();
        this.connectToRoom();
        this.scrollToBottom();
        this.getUsersConnected();
    }

    componentWillUnmount() {
        this.socket.disconnect()
    }

    componentDidUpdate() {
        this.scrollToBottom();
    }

    scrollToBottom = () => {
        this.scrollDown.scrollIntoView({ behavior: "smooth"})
    };

    appendMessages = (message) => {
        console.log(this.state.messages);
        this.setState({messages: [...this.state.messages, message]});

    };

    getMessages = async () => {
        let resp = await makeRequest('messages/threads/' + this.tid, 'GET',);
        this.setState({messages: resp.data});
        console.log(this.state.messages);
    };


    connectToRoom = () => {
        console.log(this.state.messages);
        try {
            this.socket.on('connect', () => {
                this.setState({connected: true});
            });
            this.socket.on('joined-room', (user) => {
                this.setState({activeUsers: [...this.state.activeUsers, user.username]});
            });
            this.socket.on('left-room', (user) => {
                console.log('left-room' + user.username)
            });
            this.socket.on('chat-message', (message) => {
                this.appendMessages(message);
                this.scrollDown.scrollIntoView({ behavior: "smooth"});
            });
        } catch (e) {
            console.log('Socket ERROR: ' + e);
        }
    };

    handleClick = async (event) => {
        event.preventDefault();
        if (this.socket && this.state.inputVal.length) {
            var final_data = {
                'message': this.state.inputVal,
            };
            this.socket.emit('send-message', {
                message: this.state.inputVal,
                username: this.profile.username,
                time_sent: new Date().toISOString(),
                t_id: this.tid});
        }
        this.setState({ inputVal: ''});
    };

    handleEnter = (event) => {
        if (event.key === "Enter") {
            this.handleClick(event);
        }
    };

    handleSearchChange = async(e) => {
        this.setState({

            searchResults: [],
        });
        let val = e.target.value;
        console.log(val);
        if (val.length) {
            let resp = await makeRequest(
                "users/search",
                'post',
                {
                    search: val
                }
            );
            if (resp.data.length)
            {
                this.setState({
                    searchResults: resp.data[0],
                })

            }
        }
        this.setState({
            addUserInputVal: val,
        })
    };

    addUser = async (e) => {
        if (e.key === "Enter") {
            if (this.state.searchResults) {
                let resp = await makeRequest('messages/threads/add_user', 'post',
                    {
                        threadId: this.tid,
                        targetId: this.state.searchResults.u_id
                    });
                if (resp.data)  this.setState({connectedUsers: [...this.state.connectedUsers, resp.data] });
            }
            this.setState({ addUserInputVal: '', searchResults: {}})
        }
    };

    getUsersConnected = async () => {
        let resp = await makeRequest('messages/threads/' + this.tid + '/users');
        if (resp.data) {
            this.setState({ connectedUsers: resp.data })
        }
    };

    renderMessages = () => {
        return (
            this.state.messages.map((message) => {
                return (
                    <div key={message.m_id} className={(message.username === this.profile.username) ? "sent" : "received"}>
                        <div className={'container-fluid'}>
                        <div className={'row message_info'}>
                            <img className={'message_img'} src={"https://cdn.intra.42.fr/users/small_" + message.username + (message.username === 'marvin' ? ".png" : ".jpg")}/>
                            <span className={'message_info_time'}>{calculateTimeSince(message.time_sent)}</span>
                        </div>
                        <div className={'row message_content'}>
                            <span className={"message_text"}>{message.message}</span>
                        </div>
                        </div>
                    </div>
                )
            })
        )
    };

    renderConnectedUsers = () => { // TODO: the status dot only shows the logged in user as active; fix this.
        return (
            this.state.connectedUsers.map((user) => {
                return (
                    <div>
                        <img
                            key={user.u_id}
                            className={'message_img'}
                            src={"https://cdn.intra.42.fr/users/small_" + user.username  + ".jpg"}
                        />
                        <div
                            className={'connected_' +
                            ((user.username === getLocal('token').user.username || this.state.activeUsers.includes(user.username)) ? "active" : "inactive")
                            + '_dot'}>
                        </div>
                    </div>
                    )
            })
        )
    }

    render() {
        return (
            <div>
                <div className={'message_cont container'}>
                    <div className={'row ml-0'}>{this.renderConnectedUsers()}</div>
                    <div className={'row ml-0'}>
                        <AddToChat  searchResults={this.state.searchResults} onKeyDown={(e) => this.addUser(e)} value={this.state.addUserInputVal} onChange={(e) => this.handleSearchChange(e)} placeholder={'add user'}/>
                    </div>

                    <div className={"message_feed"}>
                        {this.renderMessages()}
                        <div ref={(el) => this.scrollDown = el}> </div>
                    </div>
                    <div className={''}>
                    <textarea id={'chat_input'} onKeyDown={(e) =>this.handleEnter(e)} value={this.state.inputVal}
                              onChange={(e) => this.setState({inputVal: e.target.value})}>
                    </textarea>
                        <button id={'send_button'} onClick={(e) => this.handleClick(e)}>{(this.state.connected ? 'send' : <CircularProgress size={20} />)}</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default Messages