export default (key, subject, level, name, isLab, description, created_at) => ({
	key,
	subject,
	level,
	name,
	isLab,
	description,
	meta: {
		created_at,
		updated_at: new Date().getTime()
	},
	private: {
		deleted: false,
		created_by: uid
	}
});

/*
EXAMPLE:
key: "PHYS-1101" // generated from `${subject}-${level}`
subject: "PHYS" // (PHYS - Physics)
level: 1101
name: "Introduction to Physics"
isLab: 0
description: "blah blah blah... blah."
 */
