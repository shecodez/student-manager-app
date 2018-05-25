import React from 'react';
// import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route, Redirect, withRouter } from 'react-router-dom';

const PrivateRoute = ({ component: Component, authenticated, ...rest }) => (
	<Route
		{...rest}
		render={props =>
			authenticated ? (
				<Component {...rest} {...props} />
			) : (
				<Redirect
					to={{
						pathname: `/login`,
						state: { from: props.location }
					}}
				/>
			)
		}
	/>
);

/* PrivateRoute.defaultProps = {
	location: null
}

PrivateRoute.propTypes = {
	component: PropTypes.func.isRequired,
	authenticated: PropTypes.bool.isRequired,
	location: PropTypes.shape({})
}; */

function mapStateToProps(state) {
	return {
		authenticated: !!state.user
	};
}

export default withRouter(connect(mapStateToProps)(PrivateRoute));
