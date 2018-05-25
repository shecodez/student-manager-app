import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { notification, DatePicker } from 'antd';
import { deleteStudent } from '../../actions/students';

import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';

class StudentDetails extends React.Component {
	deleteStudent = key => {
		this.props.history.push(`/students`);
		this.props.deleteStudent(key).then(() => {
			notification.open({
				message: 'Success',
				description: 'The Student was successfully deleted.'
			});
		});
	};

	onChange = (date, dateString) => {
		console.log(date, dateString);
	};

	render() {
		const { student } = this.props;
		const actions = { list: true, refresh: false, edit: true, delete: true };
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
				path: `${student.key}`,
				breadcrumbName: `${student.key}`
			}
		];

		return (
			<MainLayout page={'/students'} breadcrumbs={routes}>
				<div className="student-details">
					<CRUDActions
						include={actions}
						resource="students"
						resourceId={student.key}
						deleteResource={this.deleteStudent}
					/>
					<small className="sid">
						ID: <em>{student.key}</em>
					</small>

					<div>
						<h3 className="student-name">{student.name}</h3>{' '}
						<span className={`status ${student.status}`}>{student.status}</span>
					</div>
					<p className="student-email">{student.email}</p>

					<h2>Course Schedule:</h2>
					<DatePicker.MonthPicker
						onChange={this.onChange}
						placeholder="Select Term"
					/>
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state, props) {
	return {
		student: state.students[props.match.params.id]
	};
}

export default withRouter(
	connect(mapStateToProps, { deleteStudent })(StudentDetails)
);
