import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';

// import Forbidden from '../pages/Forbidden';

const withAuthorization = authCondition => Component => {
	class WithAuthorization extends React.Component {
		componentDidMount() {
			if (!authCondition(this.props.user)) {
				this.props.history.push('/login');
			}
		}

		render() {
			return this.props.user ? <Component /> : null;
		}
	}

	function mapStateToProps(state) {
		return {
			user: state.user
		};
	}

	return compose(withRouter, connect(mapStateToProps, {}))(WithAuthorization);
};

export default withAuthorization;

/* Authorization:
state.user.role === 'ADMIN'
  would be a role based authorization, while
state.permissions[state.user.role].Accounts.canCreate === true
  would be a permission based authorization.
 */
