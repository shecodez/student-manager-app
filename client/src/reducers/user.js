import { GET_CURRENT_USER } from '../constants/actionTypes';

export default function(state = {}, action) {
	switch (action.type) {
		case GET_CURRENT_USER:
			return action.payload;
		default:
			return state;
	}
}
