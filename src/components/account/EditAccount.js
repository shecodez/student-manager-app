import React from 'react';

import MainLayout from '../common/MainLayout';

class EditAccount extends React.Component {
	render() {
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
				path: `${this.props.match.params.id}`,
				breadcrumbName: `${this.props.match.params.id}`
			},
			{
				path: 'edit',
				breadcrumbName: 'edit'
			}
		];

		return (
			<MainLayout page={'/accounts'} breadcrumbs={routes}>
				<div className="edit-account">
					<h1>Edit Account</h1> Coming Soon!
				</div>
			</MainLayout>
		);
	}
}

export default EditAccount;
