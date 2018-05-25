import { FETCH_ACCOUNTS } from '../constants/actionTypes';

export default function(state = {}, action) {
	switch (action.type) {
		case FETCH_ACCOUNTS:
			return action.payload;
		default:
			return state;
	}
}
