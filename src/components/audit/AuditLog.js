import React from 'react';
import { Link } from 'react-router-dom';
import { Table, Tag, Icon, Avatar } from 'antd';
import { getAvatarColor } from '../../utils/colors';

import MainLayout from '../common/MainLayout';

const dataSource = [
	{
		key: 1,
		action: 'Deleted',
		target: {
			entity: 'Account',
			key: '-ejfs123sf456s789'
		},
		actor: {
			key: 'dni2ni4sj9sg0j-2wgmjs0-ek',
			role: 'ADMIN',
			name: 'Kim Garner'
		},
		created_at: Date.now()
	},
	{
		key: 2,
		action: 'Created',
		target: {
			entity: 'Course',
			key: '-eskswkls044j256s789'
		},
		actor: {
			key: 'dni2ni4sj9sg0j-2wgmjs0-ek',
			role: 'INSTRUCTOR',
			name: 'Sam Mills'
		},
		created_at: Date.now()
	},
	{
		key: 3,
		action: 'Updated',
		target: {
			entity: 'Role',
			key: '-klklsj39s093jkws83'
		},
		actor: {
			key: '9s8dhl3nls93s3-2wgmjs0-ek',
			role: 'ADMIN',
			name: 'Lacy Banks'
		},
		created_at: Date.now()
	}
];
class AuditLog extends React.Component {
	getColorFor = action => {
		switch (action) {
			case 'Created':
				return 'green';
			case 'Updated':
				return 'yellow';
			case 'Deleted':
				return 'red';
			default:
				return '#ddd';
		}
	};

	render() {
		const columns = [
			{
				title: 'Type',
				dataIndex: 'action',
				key: 'type',
				render: action => (
					<Icon
						type="info-circle"
						style={{ color: this.getColorFor(action) }}
					/>
				)
			},
			{
				title: 'Target',
				dataIndex: 'target',
				key: 'target',
				render: target => (
					<span>
						<b>{target.entity}</b>{' '}
						<Link to={`${target.entity.toLowerCase()}s/${target.key}`}>
							{target.key}
						</Link>
					</span>
				)
			},
			{
				title: 'Action',
				dataIndex: 'action',
				key: 'action',
				render: action => <Tag color={this.getColorFor(action)}>{action}</Tag>
			},
			{
				title: 'Actor',
				dataIndex: 'actor',
				key: 'actor',
				render: actor => (
					<span>
						<Avatar
							className="actor-role"
							style={{ backgroundColor: getAvatarColor(actor.role) }}
						>
							{actor.role[0].toUpperCase()}
						</Avatar>

						<div className="actor-info">
							<small>{actor.role}</small>
							<Link to={`/accounts/${actor.key}`}>{actor.name}</Link>
						</div>
					</span>
				)
			},
			{
				title: 'Timestamp',
				dataIndex: 'created_at',
				key: 'created_at'
			}
		];
		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'audits',
				breadcrumbName: 'audits'
			}
		];

		return (
			<MainLayout page={'/audits'} breadcrumbs={routes}>
				<div className="audit-log">
					<h1>{`Audit Log (Example WIP)`}</h1>
					<Table columns={columns} dataSource={dataSource} />
				</div>
			</MainLayout>
		);
	}
}

export default AuditLog;
