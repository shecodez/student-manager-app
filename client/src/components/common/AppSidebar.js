import React from 'react';
import { withRouter } from 'react-router-dom';
import { Menu, Layout, Icon } from 'antd';

// accounts, students, courses, roles, classes
// courseSchedules, grades, classSchedules
// permissions, audits
class AppSidebar extends React.Component {
	state = {
		menuItems: [
			{ icon: 'appstore-o', name: 'Dashboard', link: '/' },
			{ icon: 'user', name: 'Students', link: '/students' },
			{ icon: 'schedule', name: 'Courses', link: '/courses' },
			// { icon: 'profile', name: 'Classes', link: '/classes' },
			// { icon: 'book', name: 'Grade Book', link: '/grades' },
			{ icon: 'team', name: 'Accounts', link: '/accounts' },
			// Admin only below
			{ icon: 'solution', name: 'Roles', link: '/roles' },
			{ icon: 'safety', name: 'Permissions', link: '/permissions' },
			{ icon: 'export', name: 'Audit Log', link: '/audits' }
		]
	};

	handleMenuClick = ({ key }) => {
		this.props.history.push(key);
	};

	render() {
		return (
			<Layout.Sider
				width={240}
				breakpoint="lg"
				//collapsedWidth="0"
				trigger={null}
				collapsible
				collapsed={this.props.collapsed}
				onCollapse={collapsed => {
					this.props.setCollapsed(collapsed);
				}}
				className="app-sidebar"
				style={{ minHeight: '100vh' }}
			>
				<div className="logo" />
				<Menu
					theme="dark"
					mode="inline"
					defaultSelectedKeys={['0']}
					selectedKeys={[this.props.current]}
					onClick={this.handleMenuClick}
				>
					{this.state.menuItems.map(menuItem => (
						<Menu.Item key={menuItem.link}>
							<Icon type={menuItem.icon} />
							<span className="nav-text">{menuItem.name}</span>
						</Menu.Item>
					))}
				</Menu>
			</Layout.Sider>
		);
	}
}

export default withRouter(AppSidebar);
