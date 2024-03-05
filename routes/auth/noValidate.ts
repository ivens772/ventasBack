import express from 'express'
import {  loginAuth } from '../../controllers/auth';
const router = express.Router();

router.post('/auth/:email', loginAuth)

export default router