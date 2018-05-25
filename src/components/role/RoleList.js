import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { List, Avatar, Button, Modal, Row, Col, Tag } from 'antd';
import { deleteRole } from '../../actions/roles';
import { getAvatarColor } from '../../utils/colors';

// import CRUDActions from '../common/CRUDActions';
import MainLayout from '../common/MainLayout';
import RoleForm from '../forms/RoleForm';
import TableHeader from '../common/TableHeader';

class RoleList extends React.Component {
	state = {
		visible: false,
		roleData: null
	};

	showModal = roleData => {
		if (roleData) {
			this.setState({ roleData });
		}
		this.setState({ visible: true });
	};

	handleOk = data => {
		this.child.handleSubmit();
	};
	handleCancel = () => {
		this.setState({ visible: false });
	};

	//TODO : link name to permissions/role.key
	render() {
		const { roles } = this.props;

		const rolesList = (
			<div>
				<h1>Manage Roles</h1>
				<Row>
					<Col xs={{ span: 20, offset: 2 }} lg={{ span: 14, offset: 5 }}>
						<TableHeader onClick={this.showModal} noSearch />

						<List
							className="role-list"
							itemLayout="horizontal"
							dataSource={Object.values(roles)}
							renderItem={item => (
								<List.Item
									actions={[
										<a onClick={() => this.showModal(item)}>edit</a>,
										<a onClick={() => this.props.deleteRole(item.key)}>
											delete
										</a>
									]}
								>
									<List.Item.Meta
										avatar={
											<Avatar
												style={{ backgroundColor: getAvatarColor(item.key) }}
											>
												{item.name[0].toUpperCase()}
											</Avatar>
										}
										title={
											<Link to={`/permissions/${item.key}`}>
												<b>{item.priority}</b> ~ {item.name}
											</Link>
										}
										description={item.description}
									/>
									<Tag color={item.isActive ? 'green' : 'red'}>
										{item.isActive ? 'IsActive' : 'Inactive'}
									</Tag>
								</List.Item>
							)}
						/>
					</Col>
				</Row>
			</div>
		);

		const noDataMsg = (
			<div className="centered">
				<h1>No Role Data Found</h1>
				<Button type="primary" ghost onClick={this.showModal}>
					Add Role
				</Button>
			</div>
		);

		const routes = [
			{
				path: '/',
				breadcrumbName: 'SMApp'
			},
			{
				path: 'roles',
				breadcrumbName: 'roles'
			}
		];

		return (
			<MainLayout page={'/roles'} breadcrumbs={routes}>
				<div className="role-list">
					{roles.length === 0 ? noDataMsg : rolesList}
				</div>

				<Modal
					title="Set Role"
					visible={this.state.visible}
					onOk={this.handleOk}
					onCancel={this.handleCancel}
					okText="Submit"
				>
					<RoleForm
						role={this.state.roleData}
						onRef={ref => (this.child = ref)}
						closeModal={this.handleCancel}
					/>
				</Modal>
			</MainLayout>
		);
	}
}

function mapStateToProps(state) {
	return {
		roles: state.roles
	};
}

export default connect(mapStateToProps, {
	deleteRole
})(RoleList);
