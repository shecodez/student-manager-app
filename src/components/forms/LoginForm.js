import React from 'react';
//import PropTypes from 'prop-types';
import { Form, Button, Icon, Input } from 'antd';
import isEmail from 'validator/lib/isEmail';

class LoginForm extends React.Component {
	state = {
		data: {
			email: '',
			password: ''
		},
		loading: false,
		errors: {}
	};

	onChange = e => {
		if (this.state.errors[e.target.name]) {
			const errors = Object.assign({}, this.state.errors);
			delete errors[e.target.name];
			this.setState({
				data: { ...this.state.data, [e.target.name]: e.target.value },
				errors
			});
		} else {
			this.setState({
				data: { ...this.state.data, [e.target.name]: e.target.value }
			});
		}
	};

	onSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.setState({ loading: true });
			this.props.submit(this.state.data);
		}
	};

	onSubmitResetPasswordRequest = () => {
		const errors = {};
		if (!isEmail(this.state.data.email)) errors.email = 'Invalid email';

		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props.resetPasswordRequest(this.state.data.email);
		}
	};

	validate = data => {
		const errors = {};
		if (!isEmail(data.email)) errors.email = 'Invalid email';
		if (!data.password) errors.password = 'Password cannot be blank';
		return errors;
	};

	render() {
		const { data, errors } = this.state;

		return (
			<Form className="form login-form" onSubmit={this.onSubmit}>
				<Form.Item
					validateStatus={!!errors.email ? 'error' : 'success'}
					help={errors.email}
				>
					<Input
						prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="email"
						id="email"
						name="email"
						placeholder="Enter email"
						value={data.email}
						onChange={this.onChange}
					/>
				</Form.Item>

				<Form.Item
					validateStatus={!!errors.password ? 'error' : 'success'}
					help={errors.password}
				>
					<Input
						prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
						type="password"
						id="password"
						name="password"
						placeholder="Enter password"
						value={data.password}
						onChange={this.onChange}
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
					>
						Login
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

/* LoginForm.propTypes = {
	submit: PropTypes.func.isRequired,
	resetPasswordRequest: PropTypes.func.isRequired
}; */

export default LoginForm;
