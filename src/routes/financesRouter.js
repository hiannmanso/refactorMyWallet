import { Router } from 'express'
import {
	financeGET,
	financePOST,
	financeSUMGET,
} from '../controllers/financesControllers.js'

const financesRouter = Router()

financesRouter.post('/financial-events', financePOST)
financesRouter.get('/financial-events', financeGET)
financesRouter.get('/financial-events/sum', financeSUMGET)
export default financesRouter
