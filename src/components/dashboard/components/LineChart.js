import React from 'react';
import {
	LineChart as LChart,
	Line,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';

const LineChart = props => (
	<div className="line-chart">
		<div className="title">{props.chartData.title}</div>
		<ResponsiveContainer minHeight={360}>
			<LChart data={props.chartData.data}>
				<Legend verticalAlign="top" />
				<XAxis
					dataKey="name"
					axisLine={{ stroke: '#e5e5e5', strokeWidth: 1 }}
					tickLine={false}
				/>
				<YAxis axisLine={false} tickLine={false} />
				<CartesianGrid
					vertical={false}
					stroke="#e5e5e5"
					strokeDasharray="3 3"
				/>
				<Tooltip />
				{props.chartData.dataKeys.map((dk, i) => (
					<Line
						key={i}
						type="monotone"
						dataKey={dk.value}
						stroke={dk.color}
						strokeWidth={3}
						dot={{ fill: dk.color }}
						activeDot={{ r: 5, strokeWidth: 0 }}
					/>
				))}
			</LChart>
		</ResponsiveContainer>
	</div>
);

export default LineChart;
