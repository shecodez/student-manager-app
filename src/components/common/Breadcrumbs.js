import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';

const Breadcrumbs = props => {
	function itemRender(route, params, routes, paths) {
		const last = routes.indexOf(route) === routes.length - 1;
		return last ? (
			<span>{route.breadcrumbName}</span>
		) : (
			<Link to={'/' + paths.join('/')}>{route.breadcrumbName}</Link>
		);
	}
	return (
		<Breadcrumb
			separator=">"
			itemRender={itemRender}
			routes={props.breadcrumbs}
			style={{ margin: '16px 0' }}
		/>
	);
};

export default Breadcrumbs;
