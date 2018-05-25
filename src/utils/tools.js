export function generateId() {
	return 'xxx-xx-xxxx'.replace(/[x]/g, function() {
		return ((Math.random() * 9) | 0).toString();
	});
}
