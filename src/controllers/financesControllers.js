import financesRepository, {
	insertFinancialEvents,
} from '../repositories/financesRepository.js'
import { verifyToken } from '../services/financesServices.js'

export async function financePOST(req, res) {
	try {
		const authorization = req.headers.authorization || ''
		const token = authorization.replace('Bearer ', '')

		if (!token) {
			return res.sendStatus(401)
		}

		let user

		try {
			user = verifyToken(token)
		} catch {
			return res.sendStatus(401)
		}

		const { value, type } = req.body

		if (!value || !type) {
			return res.sendStatus(422)
		}

		const financialTypes = ['INCOME', 'OUTCOME']
		if (!financialTypes.includes(type)) {
			return res.sendStatus(422)
		}

		if (value < 0) {
			return res.sendStatus(422)
		}

		await financesRepository.insertFinancialEvents(user.id, value, type)

		res.sendStatus(201)
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}
export async function financeGET(req, res) {
	try {
		const authorization = req.headers.authorization || ''
		const token = authorization.replace('Bearer ', '')

		if (!token) {
			return res.sendStatus(401)
		}

		let user

		try {
			user = jwt.verify(token, process.env.JWT_SECRET)
		} catch {
			return res.sendStatus(401)
		}

		const events = await financesRepository.getInfosFinancialEvents(user.id)

		res.send(events.rows)
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}
export async function financeSUMGET(req, res) {
	try {
		const authorization = req.headers.authorization || ''
		const token = authorization.replace('Bearer ', '')

		if (!token) {
			return res.sendStatus(401)
		}

		let user

		try {
			user = jwt.verify(token, process.env.JWT_SECRET)
		} catch {
			return res.sendStatus(401)
		}

		const events = await financesRepository.getFinanceSum(user.id)
		const sum = calculateSum(events)

		res.send({ sum })
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}
