import React from 'react';
import { Form, Input } from 'antd';

const InputField = props => {
	const formItemLayout = {
		labelCol: {
			xs: { span: 24 },
			sm: { span: 8 }
		},
		wrapperCol: {
			xs: { span: 24 },
			sm: { span: 16 }
		}
	};
	const { required, input, meta: { touched, error } } = props;
	const isError = touched && error;

	return (
		<Form.Item
			{...formItemLayout}
			label={props.label}
			validateStatus={isError ? 'error' : 'success'}
			help={error}
		>
			<Input
				type={props.type}
				placeholder={`Enter ${props.label}`}
				{...input}
			/>
		</Form.Item>
	);
};

export default InputField;
