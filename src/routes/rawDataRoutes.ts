import { Router } from 'express';
import { createRawData, getAllRawData } from '@controllers/v1/rawDataController';

const router = Router();
router.post('/insert', createRawData);
router.get('/getAll', getAllRawData);
export default router;
