import express from 'express'
const router = express.Router();

import { index, create, update, destroy, editCount } from '../controllers/supportController.js';

router.get('/support', index)
router.post('/support/create', create)
router.post('/support/update', update)
router.post('/support/destroy', destroy)
router.post('/support-count', editCount)

export default router