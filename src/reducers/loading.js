import {
	STUDENTS_LOADED,
	USER_LOADED,
	ACCOUNTS_LOADED,
	COURSES_LOADED,
	ROLES_LOADED,
	PERMISSIONS_LOADED
} from '../constants/actionTypes';

export default function(state = {}, action) {
	switch (action.type) {
		case USER_LOADED:
			return { ...state, user: action.payload };
		case ACCOUNTS_LOADED:
			return { ...state, accounts: action.payload };
		case STUDENTS_LOADED:
			return { ...state, students: action.payload };
		case COURSES_LOADED:
			return { ...state, courses: action.payload };
		case ROLES_LOADED:
			return { ...state, roles: action.payload };
		case PERMISSIONS_LOADED:
			return { ...state, permissions: action.payload };
		default:
			return state;
	}
}
