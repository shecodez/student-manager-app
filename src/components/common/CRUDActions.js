import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Icon, Popconfirm } from 'antd';

// create, read(list), refresh, update(edit), delete
const CRUDActions = props => {
	return (
		<div className="actions crud-actions">
			{props.include.list && (
				<Button className="list-btn">
					<Link to={`/${props.resource}`}>
						<Icon type="bars" /> List
					</Link>
				</Button>
			)}

			{props.include.refresh && (
				<Button
					className="refresh-btn"
					icon="retweet"
					onClick={props.refresh()}
				>
					Refresh
				</Button>
			)}

			{props.include.edit && (
				<Button className="edit-btn">
					<Link to={`/${props.resource}/${props.resourceId}/edit`}>
						<Icon type="edit" /> Edit
					</Link>
				</Button>
			)}

			{props.include.delete && (
				<Popconfirm
					title="Are you Sure?"
					onConfirm={() => props.deleteResource(props.resourceId)}
				>
					<Button className="delete-btn" type="danger" ghost icon="delete">
						Delete
					</Button>
				</Popconfirm>
			)}
		</div>
	);
};

export default CRUDActions;
