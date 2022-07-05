async function insertFinancialEvents(userID, value, type) {
	return connection.query(
		`INSERT INTO "financialEvents" ("userId", "value", "type") VALUES ($1, $2, $3)`,
		[userID, value, type]
	)
}

async function getInfosFinancialEvents(userID) {
	return connection.query(
		`SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
		[userID]
	)
}
async function getFinanceSum(userID) {
	return connection.query(
		`SELECT * FROM "financialEvents" WHERE "userId"=$1 ORDER BY "id" DESC`,
		[userID]
	)
}

const financesRepository = {
	insertFinancialEvents,
	getInfosFinancialEvents,
	getFinanceSum,
}

export default financesRepository
