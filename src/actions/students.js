import { database, firebase } from '../firebase';
import { FETCH_STUDENTS, STUDENTS_LOADED } from '../constants/actionTypes';

export function getStudents() {
	return dispatch => {
		dispatch({
			type: STUDENTS_LOADED,
			payload: false
		});
		database.ref('students').on(
			'value',
			snapshot => {
				const students = snapshot.val() || [];
				dispatch({
					type: FETCH_STUDENTS,
					payload: students
				});
				dispatch({
					type: STUDENTS_LOADED,
					payload: true
				});
			},
			() => {
				dispatch({
					type: STUDENTS_LOADED,
					payload: -1
				});
			}
		);
	};
}

export function saveStudent(student) {
	const created_at = firebase.database.ServerValue.TIMESTAMP;
	const key = student.key;

	return dispatch =>
		database
			.ref('students')
			.child(key)
			.set({ ...student, key, created_at });
}

export function updateStudent(id, student) {
	const updated_at = firebase.database.ServerValue.TIMESTAMP;

	return dispatch =>
		database
			.ref('students')
			.child(id)
			.update({ ...student, updated_at });
}

export function deleteStudent(id) {
	return dispatch =>
		database
			.ref('students')
			.child(id)
			.remove();
}
