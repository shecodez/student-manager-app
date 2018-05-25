import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';

import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';

class PermissionList extends React.Component {
	render() {
		const actions = { list: false, refresh: false, edit: true };
		const columns = [
			{
				title: 'Permission',
				dataIndex: 'key',
				key: 'key',
				render: key => <Link to={`/permissions/${key}`}>{key}</Link>
			},
			{
				title: 'Count',
				dataIndex: 'count',
				key: 'count'
			},
			{
				title: 'Actions',
				key: 'actions',
				render: (text, record) => (
					<span>
						<CRUDActions
							include={actions}
							resource="permissions"
							resourceId={record.key}
						/>
					</span>
				)
			}
		];

		const { permissions } = this.props;

		const permissionsTable = (
			<div>
				<h1>Permissions</h1>
				<Table columns={columns} dataSource={Object.values(permissions)} />
			</div>
		);

		const noDataMsg = (
			<div className="centered">
				<h1>No Permission Data Found</h1>
				<p>Each role is associated with one permission.</p>
				<Button type="primary" ghost>
					<Link to="/roles">Manage Roles</Link>
				</Button>
			</div>
		);

		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'permissions',
				breadcrumbName: 'permissions'
			}
		];

		return (
			<MainLayout page={'/permissions'} breadcrumbs={routes}>
				<div className="permission-list">
					{permissions.length === 0 ? noDataMsg : permissionsTable}
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		permissions: state.permissions
	};
}

export default connect(mapStateToProps, {})(PermissionList);
