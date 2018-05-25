import React from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { notification } from 'antd';
import { deleteCourse } from '../../actions/courses';

import CRUDActions from '../common/CRUDActions';
import Course from './Course';
import MainLayout from '../common/MainLayout';

class CourseDetails extends React.Component {
	deleteCourse = id => {
		this.props.history.push(`/courses`);
		this.props.deleteCourse(id).then(() => {
			notification.open({
				message: 'Success',
				description: 'The course was successfully deleted.'
			});
		});
	};

	render() {
		if (this.props.course === null || this.props.course === undefined) {
			return (
				<div className="course-not-found centered">
					<h1>Course not found</h1>
					<Link to="/courses">Course List</Link>
				</div>
			);
		} else {
			const { course } = this.props;
			const actions = { list: true, refresh: false, edit: true, delete: true };
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
				}
			];

			return (
				<MainLayout page={'/courses'} breadcrumbs={routes}>
					<div className="course-details">
						<h1>Course Details:</h1>
						<CRUDActions
							include={actions}
							resource="courses"
							resourceId={course.key}
							deleteResource={this.deleteCourse}
						/>
						<Course course={course} />
					</div>
				</MainLayout>
			);
		}
	}
}

function mapStateToProps(state, props) {
	return {
		course: state.courses[props.match.params.id]
	};
}

export default withRouter(
	connect(mapStateToProps, { deleteCourse })(CourseDetails)
);
