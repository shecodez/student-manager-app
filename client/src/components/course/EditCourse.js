import React from 'react';
import { connect } from 'react-redux';
import { updateCourse, deleteCourse } from '../../actions/courses';
import { Row, Col, notification } from 'antd';

import CourseForm from '../forms/CourseForm';
import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';
import ErrorMessage from '../common/ErrorMessage';

class EditCourse extends React.Component {
	state = {
		error: ''
	};

	deleteCourse = id => {
		this.props.history.push(`/courses`);
		this.props.deleteCourse(id).then(() => {
			notification.open({
				message: 'Success',
				description: 'The course was successfully deleted.'
			});
		});
	};

	submit = data => {
		this.props
			.updateCourse(this.props.match.params.id, data)
			.then(() => {
				this.props.history.push(`/courses`);
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
		// console.log(data);
	};

	render() {
		const { error } = this.state;
		const { course } = this.props;
		const actions = { list: true, refresh: false, edit: false, delete: true };
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
				path: `${course.key}`,
				breadcrumbName: `${course.key}`
			},
			{
				path: 'edit',
				breadcrumbName: 'edit'
			}
		];
		const lab = course.isLab ? 'L' : '';

		return (
			<MainLayout page={'/courses'} breadcrumbs={routes}>
				<div className="edit-course">
					<h1>Edit Course:</h1>
					<div>{`${course.subject}-${course.level}${lab} ${course.name}`}</div>
					<CRUDActions
						include={actions}
						resource="courses"
						resourceId={course.key}
						deleteResource={this.deleteCourse}
					/>

					<Row>
						<Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
							{error && <ErrorMessage error={error} />}
							<CourseForm submit={this.submit} course={course} />
						</Col>
					</Row>
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		course: state.courses[props.match.params.id]
	};
}

export default connect(mapStateToProps, { updateCourse, deleteCourse })(
	EditCourse
);
