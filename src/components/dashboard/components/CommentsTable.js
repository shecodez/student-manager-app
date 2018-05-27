import React from 'react';
import { Table, Tag, Avatar } from 'antd';
import { getAvatarColor } from '../../../utils/colors';

const CommentsTable = props => {
	const getColorFor = action => {
		switch (action) {
			case 'ACCEPTED':
				return 'green';
			case 'PENDING':
				return 'yellow';
			case 'REJECTED':
				return 'red';
			default:
				return '#ddd';
		}
	};

	const columns = [
		{
			title: 'avatar',
			key: 'avatar',
			dataIndex: 'name',
			width: 48,
			className: 'avatar-column',
			render: (text, it) => (
				<Avatar
					className="avatar"
					style={{
						backgroundColor: getAvatarColor(it.name),
						verticalAlign: 'middle'
					}}
					size="large"
				>
					{it.name.charAt(0)}
				</Avatar>
			)
		},
		{
			title: 'content',
			dataIndex: 'content',
			render: (text, it) => (
				<div>
					<h5 className="name">{it.name}</h5>
					<p className="content">{it.content}</p>
					<div className="date-row">
						<Tag color={getColorFor(it.status)}>{it.status}</Tag>
						<span className="date">{it.date}</span>
					</div>
				</div>
			)
		}
	];

	return (
		<div className="comments-table">
			<Table
				pagination={false}
				showHeader={false}
				columns={columns}
				rowKey={(record, key) => key}
				dataSource={props.data.filter((item, key) => key < 3)}
			/>
		</div>
	);
};

export default CommentsTable;
