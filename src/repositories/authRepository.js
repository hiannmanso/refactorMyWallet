export async function checkUserExist(email) {
	return connection.query(`SELECT * FROM "users" WHERE "email"=$1`, [email])
}

export async function insertNewUser(name, email, hashedPassword) {
	return connection.query(
		`INSERT INTO "users" ("name", "email", "password") VALUES ($1, $2, $3)`,
		[name, email, hashedPassword]
	)
}

export async function getInfoUser(email) {
	return connection.query(`SELECT * FROM "users" WHERE "email"=$1`, [email])
}
