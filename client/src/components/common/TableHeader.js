import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button, Icon, Row, Col } from 'antd';

const TableHeader = props => (
	<Row>
		<Col sm={18} lg={16}>
			{!props.noSearch && (
				<Input.Search
					placeholder="Search..."
					onSearch={value => console.log(value)}
				/>
			)}
		</Col>
		<Col sm={6} lg={8}>
			{props.resource && (
				<Button style={{ float: 'right' }}>
					<Link to={`/${props.resource}/new`}>
						<Icon type="plus" /> CREATE
					</Link>
				</Button>
			)}
			{props.onClick && (
				<Button style={{ float: 'right' }} onClick={props.onClick}>
					<Icon type="plus" /> CREATE
				</Button>
			)}
		</Col>
	</Row>
);

export default TableHeader;
