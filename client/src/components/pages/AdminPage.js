import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';

import withAuthorization from '../common/withAuthorization';

const AdminPage = () => (
	<div>
		<h1>Admin</h1>
		<p>Restricted area! Only users with the admin rule are authorized.</p>
	</div>
);

const authCondition = user => !!user && user.role === 'ADMIN';

export default compose(
	withAuthorization(authCondition),
	connect(mapStateToProps, {})
)(AdminPage);
