import React from 'react';
import isEmail from 'validator/lib/isEmail';
import { Form, Button, Icon, Input, Select } from 'antd';
import { generateId } from '../../utils/tools';

class StudentForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				key: props.student ? props.student.key : '',
				name: props.student ? props.student.name : '',
				email: props.student ? props.student.email : '',
				status: props.student ? props.student.status : ''
			},
			loading: false,
			errors: {},
			status: [{ name: 'PENDING' }, { name: 'ACTIVE' }, { name: 'INACTIVE' }]
		};
	}

	onChange = e => {
		if (this.state.errors[e.target.name]) {
			const errors = Object.assign({}, this.state.errors);
			delete errors[e.target.name];
			this.setState({
				data: { ...this.state.data, [e.target.name]: e.target.value },
				errors
			});
		} else {
			this.setState({
				data: { ...this.state.data, [e.target.name]: e.target.value }
			});
		}
	};

	onStatusChange = value => {
		this.setState({
			data: { ...this.state.data, status: value }
		});
	};

	validate = data => {
		const errors = {};

		if (!data.key) errors.key = 'Student ID required';
		if (!data.name) errors.name = 'Student name required';
		if (data.name.length > 140) errors.name = 'Student name is too long';
		if (!data.email) errors.email = 'Student email required';
		if (!isEmail(data.email)) errors.email = 'Invalid email';
		if (!data.status) errors.status = 'Student status required';

		return errors;
	};

	onGenerateId = () => {
		if (this.props.student) return;

		this.setState({
			data: { ...this.state.data, key: generateId() }
		});
	};

	handleSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) this.props.submit(this.state.data);
	};

	render() {
		const { data, errors, status } = this.state;
		const isDisabled = this.props.student ? 'isDisabled' : '';

		return (
			<Form
				onSubmit={this.handleSubmit}
				className="form student-form"
				layout={'vertical'}
			>
				<Form.Item
					label="Student ID:"
					validateStatus={!!errors.key ? 'error' : 'success'}
					help={errors.key}
				>
					<Input
						id="key"
						name="key"
						type="text"
						placeholder="123-45-6789"
						disabled={this.props.student ? true : false}
						value={data.key}
						onChange={this.onChange}
						addonAfter={
							<span className={isDisabled}>
								<a onClick={this.onGenerateId}>Generate ID</a>
							</span>
						}
					/>
				</Form.Item>

				<Form.Item
					label="Name:"
					validateStatus={!!errors.name ? 'error' : 'success'}
					help={errors.name}
				>
					<Input
						id="name"
						name="name"
						type="text"
						placeholder="Full Name"
						value={data.name}
						onChange={this.onChange}
					/>
				</Form.Item>

				<Form.Item
					label="Email:"
					validateStatus={!!errors.email ? 'error' : 'success'}
					help={errors.email}
				>
					<Input
						id="email"
						name="email"
						type="email"
						placeholder="Email address"
						value={data.email}
						onChange={this.onChange}
					/>
				</Form.Item>

				<Form.Item
					label="Status:"
					validateStatus={!!errors.status ? 'error' : 'success'}
					help={errors.status}
				>
					<Select
						id="status"
						name="status"
						value={data.status}
						onChange={this.onStatusChange}
					>
						<Select.Option value="" key="null">
							Select student status
						</Select.Option>
						{status.map(s => (
							<Select.Option value={s.name} key={s.name}>
								{s.name}
							</Select.Option>
						))}
					</Select>
				</Form.Item>

				<Form.Item>
					<Button type="primary" htmlType="submit">
						<Icon type="save" /> Save
					</Button>
				</Form.Item>
			</Form>
		);
	}
}

export default StudentForm;
