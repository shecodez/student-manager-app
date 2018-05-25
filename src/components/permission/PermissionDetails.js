import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { updatePermission } from '../../actions/permissions';
import { Table, Checkbox, notification } from 'antd';

import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';
import EditableTagGroup from '../common/EditableTagGroup';

class PermissionDetails extends React.Component {
	state = {
		visible: false
	};

	// TODO: not sure about this method of adding / removing permissions
	addNewPermissions = tags => {
		let permissions = { ...this.props.permission.permissions };

		// if tag not in permissions add it to permissions Object
		tags.forEach(tag => {
			if (!permissions.hasOwnProperty(tag))
				permissions[tag] = {
					key: tag,
					c: 0,
					own: { u: 0, r: 0, d: 0 },
					any: { u: 0, r: 0, d: 0 }
				};
		});

		// if permission key not in tags remove it from permissions Object
		const keys = Object.keys(permissions);
		keys.forEach(key => {
			if (key && tags.indexOf(key) === -1) {
				delete permissions[key];
			}
		});

		// console.log('permissions', permissions);
		this.updateRolePermissions(permissions);
	};

	updateRolePermissions = permissions => {
		this.props
			.updatePermission(this.props.permission.key, { permissions })
			.then(() => {
				notification.open({
					message: 'Success',
					description: 'Permission(s) successfully updated.'
				});
			})
			.catch(err => {
				notification.open({
					message: 'Error',
					description: err.message
				});
			});
	};

	render() {
		const { permission } = this.props;

		const columns = [
			{
				title: 'Permission',
				dataIndex: 'key',
				key: 'key'
			},
			{
				align: 'center',
				title: 'Create',
				dataIndex: 'c',
				key: 'c',
				render: value => <Checkbox checked={value} />
			},
			{
				title: 'Review',
				children: [
					{
						align: 'center',
						title: 'Own',
						dataIndex: 'own.r',
						key: 'own.r',
						render: value => <Checkbox checked={value} />
					},
					{
						align: 'center',
						title: 'Any',
						dataIndex: 'any.r',
						key: 'any.r',
						render: value => <Checkbox checked={value} />
					}
				]
			},
			{
				title: 'Update',
				children: [
					{
						align: 'center',
						title: 'Own',
						dataIndex: 'own.u',
						key: 'own.u',
						render: value => <Checkbox checked={value} />
					},
					{
						align: 'center',
						title: 'Any',
						dataIndex: 'any.u',
						key: 'any.u',
						render: value => <Checkbox checked={value} />
					}
				]
			},
			{
				title: 'Delete',
				children: [
					{
						align: 'center',
						title: 'Own',
						dataIndex: 'own.d',
						key: 'own.d',
						render: value => <Checkbox checked={value} />
					},
					{
						align: 'center',
						title: 'Any',
						dataIndex: 'any.d',
						key: 'any.d',
						render: value => <Checkbox checked={value} />
					}
				]
			}
		];
		const actions = { list: true, refresh: false, edit: true, delete: false };
		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'permissions',
				breadcrumbName: 'permissions'
			},
			{
				path: `${permission.key}`,
				breadcrumbName: `${permission.key}`
			}
		];

		return (
			<MainLayout page={'/permissions'} breadcrumbs={routes}>
				<div className="permission-details">
					<CRUDActions
						include={actions}
						resource="permissions"
						resourceId={permission.key}
					/>
					<small className="count">
						<em>Number of Accounts with this role:</em> {permission.count}
					</small>
					<h3 className="permission-name">Permissions Matrix</h3>
					<p>{`Role: ${permission.key}`}</p>

					<EditableTagGroup
						tags={Object.keys(permission.permissions)}
						tagFor="permission"
						save={this.addNewPermissions}
					/>
					<Table
						bordered
						dataSource={Object.values(permission.permissions)}
						columns={columns}
					/>
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		permission: state.permissions[props.match.params.id]
	};
}

export default withRouter(
	connect(mapStateToProps, { updatePermission })(PermissionDetails)
);
