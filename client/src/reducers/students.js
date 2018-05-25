import { FETCH_STUDENTS } from '../constants/actionTypes';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_STUDENTS:
			return action.payload;
		default:
			return state;
	}
}
