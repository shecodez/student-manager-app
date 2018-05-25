import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button, Table, Tag } from 'antd';
import { deleteAccount } from '../../actions/accounts';
import { getAvatarColor } from '../../utils/colors';

import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';
import TableHeader from '../common/TableHeader';

class AccountList extends React.Component {
	render() {
		const actions = { list: false, refresh: false, edit: true, delete: true };
		const columns = [
			{
				title: 'Account ID',
				dataIndex: 'key',
				key: 'key',
				render: key => <Link to={`/accounts/${key}`}>{key}</Link>
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email'
			},
			{
				title: 'Role',
				dataIndex: 'role',
				key: 'role',
				render: role => <Tag color={getAvatarColor(role)}>{role}</Tag>
			},
			{
				title: 'Actions',
				key: 'actions',
				render: (text, record) => (
					<span>
						<CRUDActions
							include={actions}
							resource="accounts"
							resourceId={record.id}
							deleteResource={this.props.deleteAccount}
						/>
					</span>
				)
			}
		];
		const { accounts } = this.props;
		const accountsTable = (
			<div>
				<h1>Accounts</h1>
				<Table
					title={() => <TableHeader resource="accounts" />}
					columns={columns}
					dataSource={Object.values(accounts)}
				/>
			</div>
		);
		const noDataMsg = (
			<div className="centered">
				<h1>No Account Data Found</h1>
				<Button type="primary" ghost>
					<Link to="/accounts/new">Create New Account</Link>
				</Button>
			</div>
		);
		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'accounts',
				breadcrumbName: 'accounts'
			}
		];

		return (
			<MainLayout page={'/accounts'} breadcrumbs={routes}>
				<div className="account-list">
					{accounts.length === 0 ? noDataMsg : accountsTable}
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		accounts: state.accounts
	};
}

export default connect(mapStateToProps, {
	deleteAccount
})(AccountList);
