import express from 'express'
const router = express.Router();

import { index, create, update, destroy } from '../controllers/accessController.js';

router.get('/access', index)
router.post('/access/create', create)
router.post('/access/update', update)
router.post('/access/destroy', destroy)

export default router