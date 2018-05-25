import React from 'react';
import { connect } from 'react-redux';
import { updateStudent, deleteStudent } from '../../actions/students';
import { Row, Col, notification } from 'antd';

import StudentForm from '../forms/StudentForm';
import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';
import ErrorMessage from '../common/ErrorMessage';

class EditStudent extends React.Component {
	state = {
		error: ''
	};

	deleteCourse = id => {
		this.props.history.push(`/students`);
		this.props.deleteCourse(id).then(() => {
			notification.open({
				message: 'Success',
				description: 'The student was successfully deleted.'
			});
		});
	};

	submit = data => {
		this.props
			.updateStudent(this.props.match.params.id, data)
			.then(() => {
				this.props.history.push(`/students`);
				notification.open({
					message: 'Success',
					description: 'The student was successfully updated.'
				});
			})
			.catch(err => {
				this.setState({ error: err.message });
			});
		// console.log(data);
	};

	render() {
		const { error } = this.state;
		const { student } = this.props;
		const actions = { list: true, refresh: false, edit: false, delete: true };
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
			},
			{
				path: 'edit',
				breadcrumbName: 'edit'
			}
		];

		return (
			<MainLayout page={'/students'} breadcrumbs={routes}>
				<div className="edit-student">
					<h1>Edit Student:</h1>
					<div>{student.name}</div>
					<CRUDActions
						include={actions}
						resource="students"
						resourceId={student.key}
						deleteResource={this.deleteStudent}
					/>

					<Row>
						<Col xs={{ span: 20, offset: 2 }} lg={{ span: 12, offset: 6 }}>
							{error && <ErrorMessage error={error} />}
							<StudentForm submit={this.submit} student={student} />
						</Col>
					</Row>
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
export default connect(mapStateToProps, { updateStudent, deleteStudent })(
	EditStudent
);
