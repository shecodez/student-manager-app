import React from 'react';
import { connect } from 'react-redux';

import MainLayout from '../common/MainLayout';
import Dashboard from './Dashboard';
import LandingPage from './LandingPage';

class HomePage extends React.Component {
	render() {
		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			}
		];
		return (
			<MainLayout page={'/'} breadcrumbs={routes}>
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
