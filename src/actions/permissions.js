import { database, firebase } from '../firebase';
import {
	FETCH_PERMISSIONS,
	PERMISSIONS_LOADED
} from '../constants/actionTypes';

export function getPermissions() {
	return dispatch => {
		dispatch({
			type: PERMISSIONS_LOADED,
			payload: false
		});
		database.ref('permissions').on(
			'value',
			snapshot => {
				const permissions = snapshot.val() || [];
				dispatch({
					type: FETCH_PERMISSIONS,
					payload: permissions
				});
				dispatch({
					type: PERMISSIONS_LOADED,
					payload: true
				});
			},
			() => {
				dispatch({
					type: PERMISSIONS_LOADED,
					payload: -1
				});
			}
		);
	};
}

export function savePermission(permission) {
	const created_at = firebase.database.ServerValue.TIMESTAMP;
	const key = permission.key;

	return dispatch =>
		database
			.ref('permissions')
			.child(key)
			.set({ ...permission, key, created_at });
}

export function updatePermission(key, permission) {
	const updated_at = firebase.database.ServerValue.TIMESTAMP;

	return dispatch =>
		database
			.ref('permissions')
			.child(key)
			.update({ ...permission, updated_at });
}

export function deletePermission(key) {
	return dispatch =>
		database
			.ref('permissions')
			.child(key)
			.remove();
}
