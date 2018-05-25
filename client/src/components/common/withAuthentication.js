import React from 'react';
import { connect } from 'react-redux';
import { getUser } from '../../actions/auth';

// import Unauthorized from '../pages/Unauthorized';

const withAuthentication = Component => {
	class WithAuthentication extends React.Component {
		componentDidMount() {
			this.props.getUser();
		}

		render() {
			return <Component />;
		}
	}

	return connect(null, { getUser })(WithAuthentication);
};

export default withAuthentication;
