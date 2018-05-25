import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'antd';

import MainLayout from '../common/MainLayout';
import Account from './Account';

class AccountDetails extends React.Component {
	render() {
		const { account } = this.props;
		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'accounts',
				breadcrumbName: 'accounts'
			},
			{
				path: `${account.key}`,
				breadcrumbName: `${account.key}`
			}
		];

		return (
			<MainLayout page={'/accounts'} breadcrumbs={routes}>
				<div className="account-details">
					<Row>
						<Col sm={22} lg={9}>
							<Account account={account} />
						</Col>
					</Row>
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		account: state.accounts[props.match.params.id]
	};
}

export default connect(mapStateToProps, {})(AccountDetails);
