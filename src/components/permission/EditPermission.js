import React from 'react';
import { connect } from 'react-redux';
import { updatePermission } from '../../actions/permissions';
import { notification } from 'antd';

import PermissionsForm from '../forms/PermissionsForm';
import MainLayout from '../common/MainLayout';
import ErrorMessage from '../common/ErrorMessage';

class EditPermission extends React.Component {
	state = {
		error: ''
	};

	submit = (data) => {
		this.props.updatePermission(this.props.match.params.id, data)
		.then(() => {
			notification.open({
				message: 'Success',
				description: 'Permission(s) successfully updated.'
			});
		})
		.catch(err => {
			this.setState({ error: err.message });
		})
	}

	render() {
		const { error } = this.state;
		const { permission } = this.props;
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
			},
			{
				path: 'edit',
				breadcrumbName: 'edit'
			}
		];

		return (
			<MainLayout page={'/permissions'} breadcrumbs={routes}>
				<div className="edit-permission">
					<h1>{`Manage ${permission.key} Permissions`} </h1>
					{error && <ErrorMessage error={error} />}
					<PermissionsForm submit={this.submit} permissions={permission.permissions}/>

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

export default connect(mapStateToProps, { updatePermission })(EditPermission);
