import React from 'react';
import { connect } from 'react-redux';

import MainLayout from '../common/MainLayout';
import Dashboard from '../dashboard/Dashboard';
import LandingPage from './LandingPage';

class HomePage extends React.Component {
	render() {
		const { authenticated } = this.props;

		return (
			<MainLayout
				page={'/'}
				bgColor={authenticated ? 'transparent' : '#fff'}
				padding={authenticated ? 12 : 16}
			>
				<div className="home-page">
					{this.props.authenticated ? <Dashboard /> : <LandingPage />}
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: !!state.user
	};
}

export default connect(mapStateToProps, {})(HomePage);
