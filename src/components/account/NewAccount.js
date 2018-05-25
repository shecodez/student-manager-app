import React from 'react';
import { connect } from 'react-redux';
import { createAccount } from '../../actions/auth';
import { Row, Col, notification } from 'antd';

import AccountForm from '../forms/AccountForm';
import MainLayout from '../common/MainLayout';
import ErrorMessage from '../common/ErrorMessage';

class NewAccount extends React.Component {
	state = {
		error: ''
	};

	submit = data => {
		this.props
			.createAccount(data)
			.then(() => {
				// TODO: reset form?
				this.props.history.push(`/accounts`);
				notification.open({
					message: 'Success',
					description: 'The account was successfully created.'
				});
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
	};

	render() {
		const { error } = this.state;
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
				path: 'new',
				breadcrumbName: 'new'
			}
		];

		return (
			<MainLayout page={'/accounts'} breadcrumbs={routes}>
				<div className="new-account">
					<h1>Create New Account</h1>
					<Row>
						<Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
							{error && <ErrorMessage error={error} />}
							<AccountForm submit={this.submit} />
						</Col>
					</Row>
				</div>
			</MainLayout>
		);
	}
}

export default connect(null, { createAccount })(NewAccount);
