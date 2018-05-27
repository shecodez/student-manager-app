import React from 'react';
import { Link } from 'react-router-dom';

class NotFound extends React.Component {
	render() {
		return (
			<div className="error-page not-found">
				<div className="content">
					<h1 className="title">404</h1>
					<h2 className="desc">Sorry, Page Not Found</h2>
					<Link to="/">Go Back to Home Page</Link>
				</div>
			</div>
		);
	}
}

export default NotFound;
