import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getUser } from '../../actions/auth';
import { getAccounts } from '../../actions/accounts';
import { getStudents } from '../../actions/students';
import { getCourses } from '../../actions/courses';
import { getRoles } from '../../actions/roles';
import { getPermissions } from '../../actions/permissions';

import LoadingIndicator from './LoadingIndicator';

class withDataLoader extends React.Component {
	componentWillMount() {
		const {
			userLoaded,
			studentsLoaded,
			accountsLoaded,
			coursesLoaded,
			rolesLoaded,
			permissionsLoaded
		} = this.props;

		if (userLoaded === undefined) {
			this.props.getUser();
		}

		if (studentsLoaded === undefined) {
			this.props.getStudents();
		}

		if (accountsLoaded === undefined) {
			this.props.getAccounts();
		}

		if (coursesLoaded === undefined) {
			this.props.getCourses();
		}

		if (rolesLoaded === undefined) {
			this.props.getRoles();
		}

		if (permissionsLoaded === undefined) {
			this.props.getPermissions();
		}
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.studentsLoaded === -1 && nextProps.user !== null) {
			this.props.getStudents();
		}

		if (nextProps.accountsLoaded === -1 && nextProps.user !== null) {
			this.props.getAccounts();
		}

		if (nextProps.coursesLoaded === -1 && nextProps.user !== null) {
			this.props.getCourses();
		}

		if (nextProps.rolesLoaded === -1 && nextProps.user !== null) {
			this.props.getRoles();
		}

		if (nextProps.permissionsLoaded === -1 && nextProps.user !== null) {
			this.props.getPermissions();
		}
	}

	render() {
		const {
			userLoaded,
			studentsLoaded,
			accountsLoaded,
			coursesLoaded,
			rolesLoaded,
			permissionsLoaded
		} = this.props;
		if (
			(userLoaded &&
				studentsLoaded &&
				accountsLoaded &&
				coursesLoaded &&
				rolesLoaded &&
				permissionsLoaded) ||
			this.props.user === null
		) {
			return <div>{this.props.children}</div>;
		} else {
			return <LoadingIndicator />;
		}
	}
}

function mapStateToProps(state) {
	return {
		userLoaded: state.loaded.user,
		studentsLoaded: state.loaded.students,
		accountsLoaded: state.loaded.accounts,
		coursesLoaded: state.loaded.courses,
		rolesLoaded: state.loaded.roles,
		permissionsLoaded: state.loaded.permissions,
		user: state.user
	};
}

export default withRouter(
	connect(mapStateToProps, {
		getUser,
		getStudents,
		getAccounts,
		getCourses,
		getRoles,
		getPermissions
	})(withDataLoader)
);
