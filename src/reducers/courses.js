import { FETCH_COURSES } from '../constants/actionTypes';

export default function(state = [], action = {}) {
	switch (action.type) {
		case FETCH_COURSES:
			return action.payload;
		default:
			return state;
	}
}
