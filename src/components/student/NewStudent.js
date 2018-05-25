import React from 'react';
import { connect } from 'react-redux';
import { saveStudent } from '../../actions/students';
import { Row, Col, notification } from 'antd';

import StudentForm from '../forms/StudentForm';
// import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';
import ErrorMessage from '../common/ErrorMessage';

class NewStudent extends React.Component {
	state = {
		error: ''
	};

	submit = data => {
		this.props
			.saveStudent(data)
			.then(() => {
				this.props.history.push(`/students`);
				notification.open({
					message: 'Success',
					description: 'The student was successfully created.'
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
				path: 'students',
				breadcrumbName: 'students'
			},
			{
				path: 'new',
				breadcrumbName: 'new'
			}
		];

		return (
			<MainLayout page={'/students'} breadcrumbs={routes}>
				<div className="new-student">
					<h1>New Student</h1>

					<Row>
						<Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
							{error && <ErrorMessage error={error} />}
							<StudentForm submit={this.submit} />
						</Col>
					</Row>
				</div>
			</MainLayout>
		);
	}
}

export default connect(null, { saveStudent })(NewStudent);
