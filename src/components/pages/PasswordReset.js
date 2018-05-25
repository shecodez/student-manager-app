import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { resetPassword } from '../../actions/auth';

import ErrorMessage from '../common/ErrorMessage';

const PasswordReset = () => (
	<div>
		<h1>Forgot Password</h1>
		<PasswordResetForm />
	</div>
);

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

const INITIAL_STATE = {
	email: '',
	error: null
};

class PasswordResetForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = { ...INITIAL_STATE };
	}

	handleSubmit = e => {
		e.preventDefault();

		this.props
			.resetPassword(this.state.email)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
			})
			.catch(err => {
				this.setState(byPropKey('error', err));
			});
	};

	render() {
		const { email, error } = this.state;

		const isInvalid = email === '';

		return (
			<form onSubmit={this.handleSubmit}>
				{error && <ErrorMessage error={error.message} />}

				<input
					value={email}
					onChange={e => this.setState(byPropKey('email', e.target.value))}
					type="text"
					placeholder="Email Address"
				/>

				<button htmlType="submit" disabled={isInvalid}>
					Reset My Password
				</button>
			</form>
		);
	}
}

const ResetPasswordLink = () => (
	<p>
		<Link to="/forgot-password">Forgot Password?</Link>
	</p>
);

export default connect(null, { resetPassword })(PasswordReset);

export { PasswordResetForm, ResetPasswordLink };
