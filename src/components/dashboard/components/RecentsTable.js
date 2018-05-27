import React from 'react';
import { Table, Tag } from 'antd';
import { getAvatarColor } from '../../../utils/colors';

const RecentsTable = props => {
	const columns = [
		{
			title: 'NAME',
			dataIndex: 'name'
		},
		{
			title: 'STATUS',
			dataIndex: 'status',
			render: text => <Tag color={getAvatarColor(text)}>{text}</Tag>
		},
		{
			title: 'DATE',
			dataIndex: 'date'
			// render: text => new Date(text).format('yyyy-MM-dd')
		},
		{
			title: 'PRICE',
			dataIndex: 'price',
			render: text => (
				<span style={{ color: text > 0 ? 'green' : 'red' }}>${text}</span>
			)
		}
	];

	return (
		<div className="recents-table">
			<Table
				pagination={false}
				columns={columns}
				rowKey={(record, key) => key}
				dataSource={props.data.filter((item, key) => key < 5)}
			/>
		</div>
	);
};

export default RecentsTable;
