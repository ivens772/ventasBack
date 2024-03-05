import express from 'express'
import authRoute from './auth/auth'
import authRouteNoValidate from './auth/noValidate'
import clientRoute from './client/client'

const router = express.Router()

router.use('/api', authRoute)
router.use('/one', authRouteNoValidate)
router.use('/api', clientRoute)

export default router