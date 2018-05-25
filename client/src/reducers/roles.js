import { FETCH_ROLES } from '../constants/actionTypes';

export default function(state = [], action = {}) {
	switch (action.type) {
		case FETCH_ROLES:
			return action.payload;
		default:
			return state;
	}
}
