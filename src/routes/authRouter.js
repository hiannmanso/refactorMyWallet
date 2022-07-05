import { Router } from 'express'
import { signInPOST, signUpPOST } from '../controllers/authControllers.js'

const authRouter = Router()

authRouter.post('/sign-up', signUpPOST)
authRouter.post('sign-in', signInPOST)
export default authRouter
