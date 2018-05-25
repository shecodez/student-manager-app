import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { Layout } from 'antd';

import AppHeader from './AppHeader';
import AppFooter from './AppFooter';
import AppSidebar from './AppSidebar';
import Breadcrumbs from './Breadcrumbs';

class MainLayout extends React.Component {
	state = {
		collapsed: false
	};

	toggle = () => {
		this.setState({
			collapsed: !this.state.collapsed
		});
	};

	setCollapsed = collapsed => {
		this.setState({
			collapsed
		});
	};

	render() {
		const { page, breadcrumbs, authenticated } = this.props;

		return (
			<Layout className="main-layout">
				{authenticated && (
					<AppSidebar
						current={page}
						collapsed={this.state.collapsed}
						setCollapsed={this.setCollapsed}
					/>
				)}
				<Layout style={{ minHeight: '100vh' }}>
					<AppHeader toggle={this.toggle} collapsed={this.state.collapsed} />
					<Layout.Content className={`main-content auth-${authenticated}`}>
						{authenticated && <Breadcrumbs breadcrumbs={breadcrumbs} />}
						<div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
							{this.props.children}
						</div>
					</Layout.Content>
					<AppFooter />
				</Layout>
			</Layout>
		);
	}
}

/* MainLayout.propTypes = {
	authenticated: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired
}; */

function mapStateToProps(state) {
	return {
		authenticated: !!state.user
	};
}

export default connect(mapStateToProps, {})(MainLayout);
