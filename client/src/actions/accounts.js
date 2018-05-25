import { database, firebase } from '../firebase';
import { FETCH_ACCOUNTS, ACCOUNTS_LOADED } from '../constants/actionTypes';

export function getAccounts() {
	return dispatch => {
		dispatch({
			type: ACCOUNTS_LOADED,
			payload: false
		});
		database.ref('users').on(
			'value',
			snapshot => {
				const accounts = snapshot.val() || [];
				dispatch({
					type: FETCH_ACCOUNTS,
					payload: accounts
				});
				dispatch({
					type: ACCOUNTS_LOADED,
					payload: true
				});
			},
			() => {
				dispatch({
					type: ACCOUNTS_LOADED,
					payload: -1
				});
			}
		);
	};
}

export function updateAccount(id, account) {
	const updated_at = firebase.database.ServerValue.TIMESTAMP;

	return dispatch =>
		database
			.ref('users')
			.child(id)
			.update({ ...account, updated_at });
}

export function changeRole(id, oldRole, newRole) {
	const updated_at = firebase.database.ServerValue.TIMESTAMP;

	const updates = {};
	updates[`users/${id}`] = {
		role: newRole,
		updated_at
	};

	const oldRoleCountRef = database.ref(`permissions/${oldRole}/count`);
	oldRoleCountRef.transaction(function(current_value) {
		return (current_value || 0) - 1;
	});

	const newRoleCountRef = database.ref(`permissions/${newRole}/count`);
	newRoleCountRef.transaction(function(current_value) {
		return (current_value || 0) + 1;
	});

	return dispatch => database.ref().update(updates);
}

export function deleteAccount(id) {
	return dispatch =>
		database
			.ref('users')
			.child(id)
			.remove();
}

/*
updates[`permissions/${oldRole}`] = {
	count: --,
	updated_at
};
updates[`permissions/${newRole}`] = {
	count: ++,
	updated_at
};
 */
