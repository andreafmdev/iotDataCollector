import { Router } from 'express';
import { container } from 'tsyringe';

import { MeausureDataController } from '@controllers/v1/MeausureDataController';

const router = Router();
const meausureDataController = container.resolve(MeausureDataController);

router.post('/insert', (req, res, next) => meausureDataController.createMeasureData(req, res, next));
router.get('/getAll', (req, res, next) => meausureDataController.getAllMeasureData(req, res, next));
export default router;
