import express from 'express';
const router = express.Router();
import { deleteUser, getUser, getUserId, login, register, updateUser } from '../controls/user.js';
import {verifyTokenAndAuthorization, verifyTokenAndAdmin} from '../middlewares/verify.js';

router.get('/api/getUser', verifyTokenAndAdmin, getUser) // get all users
router.get('/api/getUserId/:id', verifyTokenAndAuthorization, getUserId) // get user by id
router.post('/api/register', register) // create new user
router.post('/api/login', login) // login
router.put('/api/updateUser/:id', verifyTokenAndAuthorization, updateUser) // update user
router.delete('/api/deleteUser/:id', verifyTokenAndAuthorization, deleteUser) // delete user

export default router



