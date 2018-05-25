import React from 'react';
import { connect } from 'react-redux';
import { saveRole, updateRole } from '../../actions/roles';
import { Form, Input, Radio, InputNumber, notification } from 'antd';

import ErrorMessage from '../common/ErrorMessage';

const byPropKey = (propertyName, value) => () => ({
	[propertyName]: value
});

const INITIAL_STATE = {
	priority: 10,
	name: '',
	description: '',
	isActive: 1,
	error: null,
	errors: {}
};

class RoleForm extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			priority: props.role.key ? props.role.priority : 10,
			name: props.role.key ? props.role.name : '',
			description: props.role.key ? props.role.description : '',
			isActive: props.role.key ? props.role.isActive : 1,
			error: null,
			errors: {}
		};
	}

	componentDidMount() {
		this.props.onRef(this);
	}
	componentWillUnmount() {
		this.props.onRef(undefined);
	}

	onPriorityChange = value => {
		this.setState({ priority: value });
	};

	validate = data => {
		const errors = {};

		if (!data.priority) errors.priority = 'Role priority required';
		if (!data.name) errors.name = 'Role name required';
		if (data.name.length > 40) errors.name = 'Role name is too long';
		if (data.description.length > 140)
			errors.description = 'Role description is too long';
		if (data.isActive === '')
			errors.isActive = 'Please select role active or inactive';

		return errors;
	};

	handleSubmit = () => {
		//e.preventDefault();
		const data = {
			priority: this.state.priority,
			name: this.state.name,
			description: this.state.description,
			isActive: this.state.isActive
		};
		const errors = this.validate(data);
		this.setState({ errors });
		if (Object.keys(errors).length === 0) {
			if (this.props.role.key) this.editRole(data);
			else this.saveRole(data);
		}
	};

	saveRole = data => {
		this.props
			.saveRole(data)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
				notification.open({
					message: 'Success',
					description: 'The role was successfully created.'
				});
				this.props.closeModal();
			})
			.catch(err => {
				this.setState(byPropKey('error', err));
			});
	};

	editRole = data => {
		this.props
			.updateRole(this.props.role.key, data)
			.then(() => {
				this.setState(() => ({ ...INITIAL_STATE }));
				notification.open({
					message: 'Success',
					description: 'The role was successfully updated.'
				});
				this.props.closeModal();
			})
			.catch(err => {
				this.setState(byPropKey('error', err));
			});
	};

	render() {
		const { priority, name, description, isActive, error, errors } = this.state;

		// const isInvalid = name === '';

		return (
			<Form className="form role-form">
				{error && <ErrorMessage error={error.message} />}

				<Form.Item
					label="Priority:"
					validateStatus={!!errors.priority ? 'error' : 'success'}
					help={errors.priority}
				>
					<InputNumber
						min={10}
						max={99}
						placeholder={10}
						type="number"
						value={priority}
						onChange={this.onPriorityChange}
					/>
				</Form.Item>

				<Form.Item
					validateStatus={!!errors.name ? 'error' : 'success'}
					help={errors.name}
				>
					<Input
						type="text"
						placeholder="Name"
						value={name}
						onChange={e => this.setState(byPropKey('name', e.target.value))}
					/>
				</Form.Item>

				<Form.Item
					validateStatus={!!errors.description ? 'error' : 'success'}
					help={errors.description}
				>
					<Input.TextArea
						autosize={{ minRows: 2, maxRows: 4 }}
						type="text"
						placeholder="Enter the role's description"
						value={description}
						onChange={e =>
							this.setState(byPropKey('description', e.target.value))
						}
					/>
				</Form.Item>

				<Form.Item
					validateStatus={!!errors.isActive ? 'error' : 'success'}
					help={errors.isActive}
				>
					<Radio.Group
						onChange={e => this.setState(byPropKey('isActive', e.target.value))}
						value={isActive}
					>
						<Radio.Button value={1}>Set Active</Radio.Button>
						<Radio.Button value={0}>Set Inactive</Radio.Button>
					</Radio.Group>
				</Form.Item>
			</Form>
		);
	}
}

export default connect(null, { saveRole, updateRole })(RoleForm);
