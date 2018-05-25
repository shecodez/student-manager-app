import { firebaseAuth, database, firebase } from '../firebase';
import { GET_CURRENT_USER, USER_LOADED } from '../constants/actionTypes';

export function getUser() {
	return dispatch => {
		dispatch({
			type: USER_LOADED,
			payload: false
		});
		firebaseAuth.onAuthStateChanged(user => {
			dispatch({
				type: GET_CURRENT_USER,
				payload: user
			});
			dispatch({
				type: USER_LOADED,
				payload: true
			});
		});
	};
}

export function login(email, pw) {
	return dispatch => firebaseAuth.signInWithEmailAndPassword(email, pw);
}

export function logout() {
	return dispatch => firebaseAuth.signOut();
}

export function resetPassword(email) {
	return dispatch => firebaseAuth.sendPasswordResetEmail(email);
}

export function changePassword(password) {
	return dispatch => firebaseAuth.currentUser.updatePassword(password);
}

export function createAccount(user) {
	const created_at = firebase.database.ServerValue.TIMESTAMP;
	const password = '123456'; // TODO: generate better init password

	return dispatch =>
		firebaseAuth
			.createUserWithEmailAndPassword(user.email, password)
			.then(user => {
				if (user !== null) {
					const updates = {};
					updates[`users/${user.uid}`] = { ...user, key: user.uid, created_at };

					const roleCountRef = database.ref(`permissions/${user.role}/count`);
					roleCountRef.transaction(function(current_value) {
						return (current_value || 0) + 1;
					});

					return dispatch => database.ref().update(updates);
				}
			});
}
