import React from 'react';
import { connect } from 'react-redux';
import { saveCourse } from '../../actions/courses';
import { Row, Col, notification } from 'antd';

import CourseForm from '../forms/CourseForm';
// import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';
import ErrorMessage from '../common/ErrorMessage';

class NewCourse extends React.Component {
	state = {
		error: ''
	};

	submit = data => {
		this.props
			.saveCourse(data)
			.then(() => {
				this.props.history.push(`/courses`);
				notification.open({
					message: 'Success',
					description: 'The course was successfully created.'
				});
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
		// console.log(data);
	};

	render() {
		const { error } = this.state;
		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'courses',
				breadcrumbName: 'courses'
			},
			{
				path: 'new',
				breadcrumbName: 'new'
			}
		];

		return (
			<MainLayout page={'/courses'} breadcrumbs={routes}>
				<div className="new-course">
					<h1>New Course:</h1>

					<Row>
						<Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
							{error && <ErrorMessage error={error} />}
							<CourseForm submit={this.submit} />
						</Col>
					</Row>
				</div>
			</MainLayout>
		);
	}
}

export default connect(null, { saveCourse })(NewCourse);
