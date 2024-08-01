import { Router } from 'express';
import { container } from 'tsyringe';

import { MeausureController } from '@controllers/v1/MeausureController';
import { authMiddleware } from '@middlewares/authMiddleware';

const measureRouter = Router();
const meausureController = container.resolve(MeausureController);

measureRouter.use(authMiddleware);
measureRouter.post('/insert', (req, res, next) => meausureController.createMeasureData(req, res, next));
measureRouter.get('/getAll', (req, res, next) => meausureController.getAllMeasureData(req, res, next));
export default measureRouter;
