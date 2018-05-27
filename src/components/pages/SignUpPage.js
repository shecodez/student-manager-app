import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
//import { createAccount, getUser } from '../../actions/auth';
import { Row, Col, Alert } from 'antd';

//import SignUpForm from '../forms/SignUpForm';

class SignUp extends React.Component {
	state = {
		loading: false,
		error: ''
	};

	componentWillMount() {
		//this.props.getUser();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.user.email !== undefined) {
			this.props.history.push(`/`);
		}
	}

	submit = data => {
		// console.log(data);
		/* this.setState({ loading: true });
		this.props
			.createAccount(data.email, data.password)
			.then(() => {
				this.props.history.replace(`/`);
			})
			.catch(err => {
				this.setState({ error: err.message, loading: false });
			});*/
	};

	render() {
		const { error } = this.state;

		return (
			<div className="register-page">
				<Row>
					<Col xs={0} sm={0} md={14} lg={14} xl={14} className="picture" />
					<Col xs={16} sm={20} md={6} lg={6} xl={6} offset={2}>
						<h1>Sign Up</h1>
						{error && (
							<Alert
								message="Oops, something went wrong!"
								description={error}
								type="error"
							/>
						)}
						<br />
						{/*<SignUpForm submit={this.submit} />*/}
						<Link to="/login">Login</Link>
					</Col>
				</Row>
			</div>
		);
	}
}

export default SignUp;

/* function mapStateToProps(state) {
	return { user: state.user };
}

export default connect(mapStateToProps, { createAccount, getUser })(SignUp);
*/
