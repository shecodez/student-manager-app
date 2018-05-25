import { database, firebase } from '../firebase';
import { FETCH_COURSES, COURSES_LOADED } from '../constants/actionTypes';

export function getCourses() {
	return dispatch => {
		dispatch({
			type: COURSES_LOADED,
			payload: false
		});
		database.ref('courses').on(
			'value',
			snapshot => {
				const courses = snapshot.val() || [];
				dispatch({
					type: FETCH_COURSES,
					payload: courses
				});
				dispatch({
					type: COURSES_LOADED,
					payload: true
				});
			},
			() => {
				dispatch({
					type: COURSES_LOADED,
					payload: -1
				});
			}
		);
	};
}

export function saveCourse(course) {
	const created_at = firebase.database.ServerValue.TIMESTAMP;
	const lab = course.isLab ? 'L' : '';
	const key = `${course.subject}-${course.level}${lab}`;

	return dispatch =>
		database
			.ref('courses')
			.child(key)
			.set({ ...course, key, created_at });
}

export function updateCourse(key, course) {
	const updated_at = firebase.database.ServerValue.TIMESTAMP;

	return dispatch =>
		database
			.ref('courses')
			.child(key)
			.update({ ...course, updated_at });
}

export function deleteCourse(key) {
	return dispatch =>
		database
			.ref('courses')
			.child(key)
			.remove();
}

/*
export function saveCourse(course) {
	const key = database().ref('course_group/courses').push().key;
	const lab = course.lab ? 'L' : '';

	const courseData = {
		key,
		slug: `${course.subject}-${course.level}${lab}`,
		subject: course.subject,
		level: course.level,
		lab: course.lab,
		name: course.name,
		description: course.description,
		credits: course.credits,
		created_at: firebase.database.ServerValue.TIMESTAMP,
		updated_at: null
	};

	const updates = {};
	updates[`course_group/courses/${key}`] = courseData;
	updates[`course_group/course_list/${key}`] = {
		isDeleted: 0
	};

	return dispatch => database().ref().update(updates);
}
*/
