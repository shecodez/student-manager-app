import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login, getUser } from '../../actions/auth';
import { Row, Col } from 'antd';

import LoginForm from '../forms/LoginForm';
import ErrorMessage from '../common/ErrorMessage';
import { ResetPasswordLink } from './PasswordReset';

class LoginPage extends React.Component {
	state = {
		loading: false,
		error: ''
	};

	componentWillMount() {
		if (this.props.user !== null) {
			this.props.history.push(`/`);
		}
	}

	submit = data => {
		// console.log(data);
		this.setState({ loading: true });
		this.props
			.login(data.email, data.password)
			.then(() => this.props.history.push(`/`))
			.catch(err => {
				this.setState({ error: err.message, loading: false });
			});
	};

	render() {
		const { error } = this.state;

		return (
			<div className="login-page">
				<Row>
					<Col xs={0} sm={0} md={14} lg={14} xl={14} className="picture" />
					<Col xs={16} sm={20} md={6} lg={6} xl={6} offset={2}>
						<h1>Login</h1>
						{error && <ErrorMessage error={error} />}
						<LoginForm submit={this.submit} />
						<ResetPasswordLink />
					</Col>
				</Row>
			</div>
		);
	}
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default withRouter(
	connect(mapStateToProps, { login, getUser })(LoginPage)
);
