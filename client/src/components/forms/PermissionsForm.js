import React from 'react';
import { Table, Checkbox, Button } from 'antd';

class PermissionsForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			permissions: props.permissions,
			saveDisabled: true
		};
	}

	// TODO: must be a better way to change the state
	onChange = e => {
		const { name, checked } = e.target;
		const path = name.split('.');

		let permissions = { ...this.state.permissions };
		if (path.length === 2) permissions[path[0]][path[1]] = checked;
		else if (path.length === 3)
			permissions[path[0]][path[1]][path[2]] = checked;

		this.setState({ permissions });
		this.setState({ saveDisabled: false });
	};

	onSave = () => {
		// console.log("permissions", this.state.permissions);
		this.props.submit({ permissions: this.state.permissions });
		this.setState({ saveDisabled: true });
	};

	render() {
		const { permissions } = this.props;

		const columns = [
			{
				title: 'Permission',
				dataIndex: 'key',
				key: 'key'
			},
			{
				align: 'center',
				title: 'Create',
				dataIndex: 'c',
				key: 'c',
				render: (val, record) => (
					<Checkbox
						name={`${record.key}.c`}
						defaultChecked={val}
						onChange={this.onChange}
					/>
				)
			},
			{
				title: 'Review',
				children: [
					{
						align: 'center',
						title: 'Own',
						dataIndex: 'own.r',
						key: 'own.r',
						render: (val, record) => (
							<Checkbox
								name={`${record.key}.own.r`}
								defaultChecked={val}
								onChange={this.onChange}
							/>
						)
					},
					{
						align: 'center',
						title: 'Any',
						dataIndex: 'any.r',
						key: 'any.r',
						render: (val, record) => (
							<Checkbox
								name={`${record.key}.any.r`}
								defaultChecked={val}
								onChange={this.onChange}
							/>
						)
					}
				]
			},
			{
				title: 'Update',
				children: [
					{
						align: 'center',
						title: 'Own',
						dataIndex: 'own.u',
						key: 'own.u',
						render: (val, record) => (
							<Checkbox
								name={`${record.key}.own.u`}
								defaultChecked={val}
								onChange={this.onChange}
							/>
						)
					},
					{
						align: 'center',
						title: 'Any',
						dataIndex: 'any.u',
						key: 'any.u',
						render: (val, record) => (
							<Checkbox
								name={`${record.key}.any.u`}
								defaultChecked={val}
								onChange={this.onChange}
							/>
						)
					}
				]
			},
			{
				title: 'Delete',
				children: [
					{
						align: 'center',
						title: 'Own',
						dataIndex: 'own.d',
						key: 'own.d',
						render: (val, record) => (
							<Checkbox
								name={`${record.key}.own.d`}
								defaultChecked={val}
								onChange={this.onChange}
							/>
						)
					},
					{
						align: 'center',
						title: 'Any',
						dataIndex: 'any.d',
						key: 'any.d',
						render: (val, record) => (
							<Checkbox
								name={`${record.key}.any.d`}
								defaultChecked={val}
								onChange={this.onChange}
							/>
						)
					}
				]
			}
		];
		const { saveDisabled } = this.state;

		return (
			<div>
				<Button
					type="primary"
					disabled={saveDisabled}
					icon="save"
					onClick={this.onSave}
					style={{ marginBottom: '1rem' }}
				>
					Save
				</Button>
				<Table
					bordered
					dataSource={Object.values(permissions)}
					columns={columns}
				/>
			</div>
		);
	}
}

export default PermissionsForm;
