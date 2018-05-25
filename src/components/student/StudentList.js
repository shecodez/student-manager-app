import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Table, Button } from 'antd';
import { deleteStudent } from '../../actions/students';

import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';
import TableHeader from '../common/TableHeader';

class StudentList extends React.Component {
	render() {
		const actions = { list: false, refresh: false, edit: true, delete: true };
		const columns = [
			{
				title: 'Student ID',
				dataIndex: 'key',
				key: 'key',
				render: key => <Link to={`/students/${key}`}>{key}</Link>
			},
			{
				title: 'Name',
				dataIndex: 'name',
				key: 'name'
			},
			{
				title: 'Email',
				dataIndex: 'email',
				key: 'email'
			},
			{
				title: 'Status',
				dataIndex: 'status',
				key: 'status',
				render: text => <span className={`status status-${text}`}>{text}</span>
			},
			{
				title: 'Actions',
				key: 'actions',
				render: (text, record) => (
					<span>
						<CRUDActions
							include={actions}
							resource="students"
							resourceId={record.key}
							deleteResource={this.props.deleteStudent}
						/>
					</span>
				)
			}
		];

		const { students } = this.props;

		const studentsTable = (
			<div>
				<h1>Students</h1>
				<Table
					title={() => <TableHeader resource="students" />}
					columns={columns}
					dataSource={Object.values(students)}
				/>
			</div>
		);

		const noDataMsg = (
			<div className="centered">
				<h1>No Student Data Found</h1>
				<Button type="primary" ghost>
					<Link to="/students/new">Create New Student</Link>
				</Button>
			</div>
		);

		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'students',
				breadcrumbName: 'students'
			}
		];

		return (
			<MainLayout page={'/students'} breadcrumbs={routes}>
				<div className="student-list">
					{students.length === 0 ? noDataMsg : studentsTable}
				</div>
			</MainLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		students: state.students
	};
}

export default connect(mapStateToProps, {
	deleteStudent
})(StudentList);
