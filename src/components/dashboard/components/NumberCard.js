import React from 'react';
// import { Link } from 'react-router-dom';
import { Icon, Card } from 'antd';
import CountUp from 'react-countup';

// TODO: make title link to resource <Link to={`/${props.title}`}>{props.title}</Link>
const NumberCard = props => (
	<Card className="number-card" bordered={false}>
		<Icon className="icon" style={{ color: props.color }} type={props.icon} />
		<div className="content">
			<p className="title">{props.title || '???'}</p>
			<p className="number">
				<CountUp
					start={0}
					end={props.number}
					duration={2.75}
					useEasing
					useGrouping
					separator=","
				/>
			</p>
		</div>
	</Card>
);

export default NumberCard;
