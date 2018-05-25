import React from 'react';
import { connect } from 'react-redux';
import isEmail from 'validator/lib/isEmail';
import { Form, Button, Icon, Input, Select } from 'antd';

class AccountForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			data: {
				name: props.account ? props.account.name : '',
				email: props.account ? props.account.email : '',
				role: props.account ? props.account.role : ''
			},
			loading: false,
			errors: {},
			roles: props.roles ? Object.values(props.roles) : []
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

	onRoleChange = value => {
		this.setState({
			data: { ...this.state.data, role: value }
		});
	};

	validate = data => {
		const errors = {};

		if (!data.name) errors.name = 'Account name required';
		if (data.name.length > 140) errors.name = 'Account name is too long';
		if (!data.email) errors.email = 'Account email required';
		if (!isEmail(data.email)) errors.email = 'Invalid email';
		if (!data.role) errors.role = 'Account role required';

		return errors;
	};

	handleSubmit = e => {
		e.preventDefault();
		const errors = this.validate(this.state.data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) this.props.submit(this.state.data);
	};

	render() {
		const { data, errors, roles } = this.state;
		// const isValid = Object.keys(this.validate(data)).length === 0;

		return (
			<Form
				onSubmit={this.handleSubmit}
				className="form account-form"
				layout={'vertical'}
			>
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
						type="text"
						placeholder="Email Address"
						value={data.email}
						onChange={this.onChange}
					/>
				</Form.Item>

				<Form.Item
					label="Status:"
					validateStatus={!!errors.role ? 'error' : 'success'}
					help={errors.role}
				>
					<Select
						id="role"
						name="role"
						value={data.role}
						onChange={this.onRoleChange}
					>
						<Select.Option value="" key="null">
							Select account role
						</Select.Option>
						{roles.map(s => (
							<Select.Option value={s.name} key={s.name}>
								{s.name.toUpperCase()}
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

function mapStateToProps(state) {
	return {
		roles: state.roles
	};
}

export default connect(mapStateToProps, {})(AccountForm);
