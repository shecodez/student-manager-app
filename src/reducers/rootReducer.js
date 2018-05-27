import { combineReducers } from 'redux';

import loaded from './loading';
import user from './user';
import accounts from './accounts';
import students from './students';
import courses from './courses';
import roles from './roles';
import permissions from './permissions';

export default combineReducers({
	loaded,
	user,
	accounts,
	students,
	courses,
	roles,
	permissions
});
