import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { Row, Col, Tabs } from 'antd';

import MainLayout from '../common/MainLayout';
import PasswordChangeForm from '../forms/PasswordChangeForm';
import withAuthorization from '../common/withAuthorization';
import Account from './Account';

class Profile extends React.Component {
	render() {
		const { account } = this.props;
		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'profile',
				breadcrumbName: 'profile'
			}
		];
		return (
			<MainLayout page={'/profile'} breadcrumbs={routes}>
				<div className="profile">
					<Row>
						<Col sm={22} lg={9}>
							<Account account={account} />
						</Col>
						<Col sm={24} lg={15}>
							<Tabs defaultActiveKey={'1'}>
								<Tabs.TabPane tab="Account Information" key={'1'}>
									<div className="centered">
										<b>Name:</b> {account.name}
										<br />
										<b>Email:</b> {account.email}
										<br />
										<b>Role:</b> {account.role}
										<br />
										<b>Phone:</b> {`+1 (123) 456-7890`}
										<br />
										<br />
										<b>Bio:</b>
										<br />
										{`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam varius mauris rhoncus dui vestibulum, at scelerisque nulla egestas. Sed mollis non diam sit amet consequat. Cras dolor enim, semper maximus volutpat id, ornare at enim. Fusce venenatis ut magna non pharetra. `}
									</div>
								</Tabs.TabPane>
								<Tabs.TabPane tab="Change Password" key={'2'}>
									<PasswordChangeForm />
								</Tabs.TabPane>
							</Tabs>
						</Col>
					</Row>
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		user: state.user,
		account: state.accounts['ovrLPLCk9SOjjT7ao0XtUxiO06B3']
	};
}

const authCondition = user => !!user;

export default compose(
	withAuthorization(authCondition),
	connect(mapStateToProps, {})
)(Profile);
