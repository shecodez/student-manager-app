import React from 'react';
import { Tag } from 'antd';
import { getAvatarColor } from '../../utils/colors';

const Account = props => (
	<div className="account">
		<Tag color={getAvatarColor(props.account.role)}>{props.account.role}</Tag>
		<img
			className="account-avatar"
			src="https://res.cloudinary.com/shecodez/image/upload/v1527127115/avatar_fshdfa.png"
			alt="avatar"
		/>
		<div>
			<h3 className="account-name">{props.account.name}</h3>
		</div>
		<p className="account-email">
			<a href={`mailto:${props.account.email}`}>{props.account.email}</a>
		</p>
	</div>
);

export default Account;
