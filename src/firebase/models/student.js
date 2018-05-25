export default (id, name, email, status, created_at) => ({
	id,
	name,
	email,
	status,
	meta: {
		created_at,
		updated_at: new Date().getTime()
	},
	private: {
		deleted: false
	}
});

/*
EXAMPLE:
id: "###-##-####" // studentId (unique)
Name: "FirstName M. LastName"
email: "fname.lname@schoolname.edu"
status: "ACTIVE" // enum: [PENDING, ACTIVE, INACTIVE]
 */
