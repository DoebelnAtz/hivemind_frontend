import React, { useState } from 'react';
import { UsernameInput, Password2Input, Password1Input, SignupButton } from './Styles';
import { makeRequest } from '../../../Api';
import { useHistory } from 'react-router';

const Signup: React.FC = () => {

	const history = useHistory();
	const [input, setInput] = useState({
		username: '',
		password1: '',
		password2: '',
	});
	const [errors, setErrors] = useState({
		usernameError: '',
		password1Error: '',
		password2Error: '',
	});

	const handleSignup = async () => {
		if (!!input.username.length && !!input.password2.length && !!input.password1.length) {
			if (input.password1 === input.password2) {
				let resp = await makeRequest('auth/signup', 'POST', {
					username: input.username,
					password: input.password1,
				});
				if (resp.data) {
					history.push('/login');
				}
			} else {
				setErrors({
					...errors,
					password1Error: 'Passwords do not match',
					password2Error: 'Passwords do not match'
				})
			}

		} else {
			setErrors({
				usernameError: !input.username.length ? 'Username required' : '',
				password1Error: !input.password1.length ? 'Password required': '',
				password2Error: !input.password2.length ? 'Password required': ''
			})
		}
	};

	const handleUsernameChange = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setInput({
			...input,
			username: target.value,
		});
	};

	const handlePassword1Change = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setInput({
			...input,
			password1: target.value,
		});
	};

	const handlePassword2Change = (e: React.SyntheticEvent) => {
		let target = e.target as HTMLInputElement;
		setInput({
			...input,
			password2: target.value,
		});
	};

	return (
		<div style={{height: '50%'}}>
			<UsernameInput>
				<input value={input.username} onChange={(e: React.SyntheticEvent) => handleUsernameChange(e)} placeholder={'intra username'}/>
			<span>{errors.usernameError}</span>
			</UsernameInput>
			<Password1Input>
				<input type={'password'}  value={input.password1} onChange={(e: React.SyntheticEvent) => handlePassword1Change(e)}  placeholder={'password'}/>
			<span>{errors.password1Error}</span>
			</Password1Input>
			<Password2Input>
				<input type={'password'}  value={input.password2} onChange={(e: React.SyntheticEvent) => handlePassword2Change(e)}  placeholder={'confirm password'}/>
				<span>{errors.password2Error}</span>
			</Password2Input>
			<SignupButton onClick={handleSignup}>Submit</SignupButton>
		</div>
	);
};

export default Signup;