import React from 'react';
import { connect } from 'react-redux';
import { changePassword } from '../../actions/auth';
import { Form, Button, Input } from 'antd';

import ErrorMessage from '../common/ErrorMessage';

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

const INITIAL_STATE = {
	passwordOne: '',
	passwordTwo: '',
	error: null,
	errors: {}
};

class PasswordChangeForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	validate = data => {
		const errors = {};

		if (!data.passwordOne) errors.passwordOne = 'New password required';
		if (!data.passwordTwo) errors.passwordTwo = 'Password confirm required';
		if (data.passwordOne !== data.passwordTwo)
			errors.passwordTwo = 'Passwords must match';

		return errors;
	};

	handleSubmit = e => {
		e.preventDefault();
		// TODO: valid old pw, then change pw
		const data = {
			passwordOne: this.state.passwordOne,
			passwordTwo: this.state.passwordTwo
		};
		const errors = this.validate(data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			this.props
				.changePassword(this.state.passwordOne)
				.then(() => {
					this.setState(() => ({ ...INITIAL_STATE }));
				})
				.catch(error => {
					this.setState(byPropKey('error', error));
				});
		}
	};

	render() {
		const { passwordOne, passwordTwo, error, errors } = this.state;

		const formItemLayout = {
			labelCol: {
				xs: { span: 24 },
				sm: { span: 8 },
				lg: { span: 8 }
			},
			wrapperCol: {
				xs: { span: 24 },
				sm: { span: 16 },
				lg: { span: 12 }
			}
		};

		return (
			<Form onSubmit={this.handleSubmit}>
				{error && <ErrorMessage error={error.message} />}

				<Form.Item
					{...formItemLayout}
					label="Password:"
					required={true}
					validateStatus={!!errors.passwordOne ? 'error' : 'success'}
					help={errors.passwordOne}
				>
					<Input
						value={passwordOne}
						onChange={e =>
							this.setState(byPropKey('passwordOne', e.target.value))
						}
						type="password"
						placeholder="New Password"
					/>
				</Form.Item>

				<Form.Item
					{...formItemLayout}
					label="Confirm Password:"
					required={true}
					validateStatus={!!errors.passwordTwo ? 'error' : 'success'}
					help={errors.passwordTwo}
				>
					<Input
						value={passwordTwo}
						onChange={e =>
							this.setState(byPropKey('passwordTwo', e.target.value))
						}
						type="password"
						placeholder="Confirm New Password"
					/>
				</Form.Item>

				<Form.Item className="centered">
					<Button type="primary" htmlType="submit">
						Change My Password
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

export default connect(null, { changePassword })(PasswordChangeForm);
