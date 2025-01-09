import express from 'express';
const router = express.Router();
import { forgetPassword, getResetPassword, resetPassword, sendResetPasswordLink } from '../controls/forget-password.js';

router.get('/forget-password', forgetPassword)
router.post('/forget-password', sendResetPasswordLink)
router.get('/reset-password/:userId/:token', getResetPassword)
router.post('/reset-password/:userId/:token', resetPassword)

export default router