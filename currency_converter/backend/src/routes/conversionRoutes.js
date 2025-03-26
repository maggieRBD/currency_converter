import express from 'express';
import { saveConversion, getConversions } from '../controllers/conversionController.js';

const router = express.Router();

router.post('/save', saveConversion);
router.get('/history', getConversions)

export default router;