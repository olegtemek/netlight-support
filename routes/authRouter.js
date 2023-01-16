import express from 'express'
const router = express.Router();

import { login, check } from '../controllers/authController.js';

router.post('/auth/login', login)
router.post('/auth/check', check)

export default router