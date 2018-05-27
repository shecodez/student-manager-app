import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, Row, Col, Button } from 'antd';
import { deleteCourse } from '../../actions/courses';

import CRUDActions from '../common/CRUDActions';
import Course from './Course';
import MainLayout from '../common/MainLayout';
import TableHeader from '../common/TableHeader';

class CourseList extends React.Component {
	state = {
		courses: {},
		filter: ''
	};

	componentDidMount() {}

	render() {
		const actions = { list: false, refresh: false, edit: true, delete: true };

		const mapCourses = _.map(this.props.courses, (course, key) => (
			<Card key={key} className="course-card">
				<CRUDActions
					include={actions}
					resource="courses"
					resourceId={course.key}
					deleteResource={this.props.deleteCourse}
				/>
				<Course course={course} link />
			</Card>
		));
		const listCourses = (
			<div>
				<TableHeader resource="courses" />
				{mapCourses}
			</div>
		);

		const noDataMsg = (
			<div className="centered">
				<h1>No Course Data Found</h1>
				<Button type="primary" ghost>
					<Link to="/courses/new">Create New Course</Link>
				</Button>
			</div>
		);

		const { courses } = this.props;

		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'courses',
				breadcrumbName: 'courses'
			}
		];

		return (
			<MainLayout page={'/courses'} breadcrumbs={routes} bgColor="transparent">
				<div className="course-list">
					<Row>
						<Col xs={{ span: 20, offset: 2 }} lg={{ span: 14, offset: 5 }}>
							{courses.length === 0 ? noDataMsg : listCourses}
						</Col>
					</Row>
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		courses: state.courses
	};
}
export default connect(mapStateToProps, { deleteCourse })(CourseList);
