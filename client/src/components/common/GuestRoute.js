import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';


const GuestRoute = ({ authenticated, component: Component, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			!authenticated ? <Component {...props} /> : <Redirect to=`/` />
		}
	/>
);

/* GuestRoute.propTypes = {
	component: PropTypes.func.isRequired,
	authenticated: PropTypes.bool.isRequired
}; */

function mapStateToProps(state) {
	return {
		authenticated: !!state.user.email
	};
}

export default connect(mapStateToProps)(GuestRoute);
