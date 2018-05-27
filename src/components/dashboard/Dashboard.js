import React from 'react';
import { Row, Col, Card, Icon } from 'antd';
import {
	numberCardData,
	employmentData,
	transationsData,
	applicantsData,
	tasksData
} from '../../utils/mock';

import NumberCard from './components/NumberCard';
import LineChart from './components/LineChart';
import RecentsTable from './components/RecentsTable';
import CommentsTable from './components/CommentsTable';
import AreaChart from './components/AreaChart';

class Dashboard extends React.Component {
	render() {
		const bodyStyle = {
			bodyStyle: {
				height: 432,
				background: '#fff'
			}
		};

		const numberCards = numberCardData.map((item, i) => (
			<Col key={i} lg={6} md={12}>
				<NumberCard {...item} />
			</Col>
		));

		return (
			<div className="dashboard">
				<Row gutter={24}>
					{numberCards}

					<Col lg={18} md={24}>
						<Card
							bordered={false}
							bodyStyle={{
								padding: '24px 36px 24px 0'
							}}
							className="widget"
						>
							<LineChart chartData={employmentData} />
						</Card>
					</Col>

					<Col lg={6} md={24}>
						<Row gutter={24}>
							<Col lg={24} md={12}>
								<Card
									bordered={false}
									className="widget"
									bodyStyle={{
										padding: 0,
										height: 204,
										background: '#95c9e1'
									}}
								>
									<div className="add-widget">
										<Icon
											type="plus-circle-o"
											style={{ color: '#fff', fontSize: 72 }}
										/>
										<h2>Add Widget</h2>
									</div>
								</Card>
							</Col>
							<Col lg={24} md={12}>
								<Card
									bordered={false}
									className="widget"
									bodyStyle={{
										padding: 0,
										height: 204,
										background: '#f6a9bd'
									}}
								>
									<div className="add-widget">
										<Icon
											type="plus-circle-o"
											style={{ color: '#fff', fontSize: 72 }}
										/>
										<h2>Add Widget</h2>
									</div>
								</Card>
							</Col>
						</Row>
					</Col>

					<Col lg={12} md={24}>
						<Card bordered={false} {...bodyStyle}>
							<RecentsTable data={transationsData} />
						</Card>
					</Col>
					<Col lg={12} md={24}>
						<Card bordered={false} {...bodyStyle}>
							<CommentsTable data={applicantsData} />
						</Card>
					</Col>

					<Col lg={24} md={24}>
						<Card
							bordered={false}
							bodyStyle={{
								padding: '24px 36px 24px 0'
							}}
						>
							<AreaChart chartData={tasksData} />
						</Card>
					</Col>
				</Row>
			</div>
		);
	}
}

export default Dashboard;
