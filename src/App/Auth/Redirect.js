import React, { useState, useEffect} from 'react';
import axios from 'axios'
import { getUrlParam, } from "../../utils/utils";

const Redirect = (props) => {

    const connect = async() => {
        let code = getUrlParam('code', '');
        console.log(code);
        let resp = await axios({
            method: 'post',
            url: "http://127.0.0.1:8002/api/auth/connect/",
            data: {
                code: code
            },
            headers:{
                'Content-Type': 'application/json'
            }
        });
        localStorage.setItem('resp', JSON.stringify(resp));
        props.history.push('/');
    };

    useEffect(() => {
        connect()
    }, []);

        return (
            <div>

            </div>
        );

};

export default Redirect;
