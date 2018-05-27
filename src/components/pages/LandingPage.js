import React from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../../actions/auth';
import { Button, notification } from 'antd';

class LandingPage extends React.Component {
	loginAsGuest = () => {
		this.props
			.login('guest@example.com', process.env.REACT_APP_GUEST_PW)
			.then(() => this.props.history.push(`/`))
			.catch(err => {
				notification.open({
					message: 'Error',
					description: err.message
				});
			});
	};

	render() {
		return (
			<div className="landing-page">
				<div className="text-box">
					<h1>
						<span className="main-heading">You manage the students</span>
						<span className="sub-heading">{`We'll manage the manager`}</span>
					</h1>

					<Button onClick={this.loginAsGuest}>Login as Guest</Button>
				</div>
			</div>
		);
	}
}

export default withRouter(connect(null, { login })(LandingPage));
