import { database, firebase } from '../firebase';
import { FETCH_ROLES, ROLES_LOADED } from '../constants/actionTypes';

export function getRoles() {
	return dispatch => {
		dispatch({
			type: ROLES_LOADED,
			payload: false
		});
		database.ref('roles').on(
			'value',
			snapshot => {
				const roles = snapshot.val() || [];
				dispatch({
					type: FETCH_ROLES,
					payload: roles
				});
				dispatch({
					type: ROLES_LOADED,
					payload: true
				});
			},
			() => {
				dispatch({
					type: ROLES_LOADED,
					payload: -1
				});
			}
		);
	};
}

export function saveRole(role) {
	const created_at = firebase.database.ServerValue.TIMESTAMP;
	const key = role.name.toUpperCase().replace(/\s/g, '_');

	const permissions = {};
	permissions['Accounts'] = {
		key: 'Accounts',
		c: 0,
		own: { r: 0, u: 0, d: 0 },
		any: { r: 0, u: 0, d: 0 },
		changeRole: 0
	};

	const updates = {};
	updates[`roles/${key}`] = { ...role, key, created_at };
	updates[`permissions/${key}`] = {
		key,
		count: 0,
		permissions,
		created_at
	};

	return dispatch => database.ref().update(updates);
}

export function updateRole(key, role) {
	const updated_at = firebase.database.ServerValue.TIMESTAMP;

	return dispatch =>
		database
			.ref('roles')
			.child(key)
			.update({ ...role, updated_at });
}

export function deleteRole(key) {
	const updates = {};
	updates[`roles/${key}`] = null;
	updates[`permissions/${key}`] = null;

	return dispatch => database.ref().update(updates);
}

/*
return dispatch =>
	database
		.ref('roles')
		.child(key)
		.set();
	return dispatch =>
		database
			.ref('roles')
			.child(key)
			.remove();
 */
