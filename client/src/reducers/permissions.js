import { FETCH_PERMISSIONS } from '../constants/actionTypes';

export default function(state = [], action) {
	switch (action.type) {
		case FETCH_PERMISSIONS:
			return action.payload;
		default:
			return state;
	}
}
