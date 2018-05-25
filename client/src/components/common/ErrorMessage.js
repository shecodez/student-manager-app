import React from 'react';
import { Alert } from 'antd';

const ErrorMessage = props => (
	<div style={{ marginBottom: '1rem' }}>
		<Alert
			message="Oops, something went wrong!"
			description={props.error}
			type="error"
			className="error-message"
		/>
	</div>
);

export default ErrorMessage;
