import express from 'express'
const router = express.Router();

import { index, create, update, destroy } from '../controllers/statusController.js';

router.get('/status', index)
router.post('/status/create', create)
router.post('/status/update', update)
router.post('/status/destroy', destroy)

export default router