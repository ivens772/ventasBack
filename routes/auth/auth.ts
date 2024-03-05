import express from 'express'
import { createUser, getAllUser, getAllUserDown, getUserId, loginAuth, logout, updateUser, userDown, userInteger } from '../../controllers/auth';
import { validateUser } from '../../middleware/validateUser';
const router = express.Router();


router.delete('/logout/', logout)
router.post('/user', createUser)
router.get('/users', getAllUser)
router.get('/usersDown', getAllUserDown)
router.get('/users/:id', getUserId)
router.put('/user/:id', updateUser)
router.put('/userUpdate/:id', userDown)
router.put('/userInteger/:id', userInteger)

export default router