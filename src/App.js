import React from 'react';
import { connect } from 'react-redux';
// import { withRouter } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';

import HomePage from './components/pages/HomePage';
import LoginPage from './components/pages/LoginPage';
import PasswordReset from './components/pages/PasswordReset';

import AccountList from './components/account/AccountList';
import NewAccount from './components/account/NewAccount';
import Profile from './components/account/Profile';
import EditAccount from './components/account/EditAccount';
import AccountDetails from './components/account/AccountDetails';

import StudentList from './components/student/StudentList';
import NewStudent from './components/student/NewStudent';
import StudentDetails from './components/student/StudentDetails';
import EditStudent from './components/student/EditStudent';

import CourseList from './components/course/CourseList';
import NewCourse from './components/course/NewCourse';
import CourseDetails from './components/course/CourseDetails';
import EditCourse from './components/course/EditCourse';

import RoleList from './components/role/RoleList';
import PermissionList from './components/permission/PermissionList';
import PermissionDetails from './components/permission/PermissionDetails';
import EditPermission from './components/permission/EditPermission';

import AuditLog from './components/audit/AuditLog';

import NotFound from './components/pages/error/NotFound';
import PrivateRoute from './components/common/PrivateRoute';

class App extends React.Component {
	render() {
		return (
			<Layout className="App">
				<Switch>
					<Route exact path="/" component={HomePage} />
					<Route exact path="/login" component={LoginPage} />
					<Route exact path="/forgot-password" component={PasswordReset} />

					<PrivateRoute exact path="/students" component={StudentList} />
					<PrivateRoute exact path="/students/new" component={NewStudent} />
					<PrivateRoute exact path="/students/:id" component={StudentDetails} />
					<PrivateRoute
						exact
						path="/students/:id/edit"
						component={EditStudent}
					/>

					<PrivateRoute exact path="/profile" component={Profile} />
					<PrivateRoute exact path="/accounts" component={AccountList} />
					<PrivateRoute exact path="/accounts/new" component={NewAccount} />
					<PrivateRoute exact path="/accounts/:id" component={AccountDetails} />
					<PrivateRoute
						exact
						path="/accounts/:id/edit"
						component={EditAccount}
					/>

					<PrivateRoute exact path="/courses" component={CourseList} />
					<PrivateRoute exact path="/courses/new" component={NewCourse} />
					<PrivateRoute exact path="/courses/:id" component={CourseDetails} />
					<PrivateRoute exact path="/courses/:id/edit" component={EditCourse} />

					<PrivateRoute exact path="/roles" component={RoleList} />
					<PrivateRoute exact path="/permissions" component={PermissionList} />
					<PrivateRoute
						exact
						path="/permissions/:id"
						component={PermissionDetails}
					/>
					<PrivateRoute
						exact
						path="/permissions/:id/edit"
						component={EditPermission}
					/>

					<PrivateRoute exact path="/audits" component={AuditLog} />

					<Route component={NotFound} />
				</Switch>
			</Layout>
		);
	}
}

function mapStateToProps(state) {
	return {
		authenticated: !!state.user
	};
}

export default connect(mapStateToProps, {})(App);
