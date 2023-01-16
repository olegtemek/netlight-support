import express from 'express'
const router = express.Router();

import { index, create, update, destroy } from '../controllers/noteController.js';

router.get('/note', index)
router.post('/note/create', create)
router.post('/note/update', update)
router.post('/note/destroy', destroy)

export default router