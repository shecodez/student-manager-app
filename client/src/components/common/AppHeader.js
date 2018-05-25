import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { logout } from '../../actions/auth';

class AppHeader extends React.Component {
	toggle = () => {
		this.props.toggle();
	};

	handleMenuClick = ({ key }) => {
		if (key === 'logout') {
			this.props.logout();
		}
	};

	render() {
		let menuItems;
		if (this.props.user) {
			menuItems = [
				<Menu.Item key="/profile" className="profile-menu">
					<ProfileDropdownMenu
						user={this.props.user}
						handleMenuClick={this.handleMenuClick}
					/>
				</Menu.Item>
			];
		} else {
			menuItems = [
				<Menu.Item key="/login">
					<Link to="/login">Login</Link>
				</Menu.Item>
			];
		}

		return (
			<Layout.Header className="app-header" style={{ background: '#fff' }}>
				<div className="container">
					<div className="app-title">
						{this.props.user && (
							<Icon
								className="trigger"
								type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}
								onClick={this.toggle}
							/>
						)}
						<Link to="/">SMApp</Link>
					</div>
					<Menu
						className="app-menu"
						mode="horizontal"
						selectedKeys={[this.props.location.pathname]}
						style={{ lineHeight: '64px' }}
					>
						<Menu.Item key="/">
							<Link to="/">
								<Icon type="home" className="nav-icon" />
							</Link>
						</Menu.Item>

						{menuItems}
					</Menu>
				</div>
			</Layout.Header>
		);
	}
}

function ProfileDropdownMenu(props) {
	const dropdownMenu = (
		<Menu onClick={props.handleMenuClick} className="profile-dropdown-menu">
			<Menu.Item key="user-info" className="dropdown-item" disabled>
				<div className="user-full-name-info">{`FirstName LastName`}</div>
				<div className="email-info">{props.user.email}</div>
			</Menu.Item>
			<Menu.Divider />
			<Menu.Item key="profile" className="dropdown-item">
				<Link to={'/profile'}>Profile</Link>
			</Menu.Item>
			<Menu.Item key="logout" className="dropdown-item">
				Logout
			</Menu.Item>
		</Menu>
	);

	return (
		<Dropdown
			overlay={dropdownMenu}
			trigger={['click']}
			getPopupContainer={() =>
				document.getElementsByClassName('profile-menu')[0]
			}
		>
			<a className="ant-dropdown-link">
				<Icon type="user" className="nav-icon" style={{ marginRight: 0 }} />{' '}
				<Icon type="down" />
			</a>
		</Dropdown>
	);
}

function mapStateToProps(state) {
	return { user: state.user };
}

export default withRouter(connect(mapStateToProps, { logout })(AppHeader));
