import React from 'react';
import {
	AreaChart as AChart,
	Area,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
	ResponsiveContainer
} from 'recharts';

const AreaChart = props => {
	return (
		<div className="area-chart">
			<div className="title">{props.chartData.title}</div>
			<ResponsiveContainer minHeight={360}>
				<AChart data={props.chartData.data}>
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
						<Area
							key={i}
							type="monotone"
							dataKey={dk.value}
							stroke={dk.color1}
							fill={dk.color1}
							strokeWidth={2}
							dot={{ fill: '#fff' }}
							activeDot={{ r: 5, fill: '#fff', stroke: dk.color2 }}
						/>
					))}
				</AChart>
			</ResponsiveContainer>
		</div>
	);
};

export default AreaChart;
