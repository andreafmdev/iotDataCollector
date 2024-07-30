import { Router } from 'express';
import { container } from 'tsyringe';

import { RawDataController } from '@controllers/v1/rawDataController';

const router = Router();
const rawDataController = container.resolve(RawDataController);

router.post('/insert', (req, res, next) => rawDataController.createRawData(req, res, next));
router.get('/getAll', (req, res, next) => rawDataController.getAllRawData(req, res, next));
export default router;
