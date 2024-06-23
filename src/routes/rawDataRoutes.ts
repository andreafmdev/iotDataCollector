import { Router } from 'express';
import { createRawData, getAllRawData } from '../controllers/rawDataController';

const router = Router();
router.post('/insert', createRawData);
router.get('/getAll', getAllRawData);
export default router;
