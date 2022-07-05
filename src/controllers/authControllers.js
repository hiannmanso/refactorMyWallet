import { hashSync } from 'bcrypt'
import connection from '../database.js'
import {
	checkUserExist,
	getInfoUser,
	insertNewUser,
} from '../repositories/authRepository.js'
import { compareSync } from '../services/authService.js'

export async function signUpPOST(req, res) {
	try {
		const { name, email, password } = req.body

		if (!name || !email || !password) {
			return res.sendStatus(422)
		}
		const existingUsers = await checkUserExist(email)

		if (existingUsers.rowCount > 0) {
			return res.sendStatus(409)
		}

		const hashedPassword = hashSync(password, 12)

		await insertNewUser(name, email, hashedPassword)

		res.sendStatus(201)
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}

export async function signInPOST(req, res) {
	try {
		const { email, password } = req.body

		if (!email || !password) {
			return res.sendStatus(422)
		}

		const { rows } = await getInfoUser(email)
		const [user] = rows

		if (!user || compareSync(password, user.password)) {
			return res.sendStatus(401)
		}

		const token = createToken(id)

		res.send({
			token,
		})
	} catch (err) {
		console.error(err)
		res.sendStatus(500)
	}
}
