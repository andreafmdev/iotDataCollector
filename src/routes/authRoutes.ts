import { Router } from 'express';
import { container } from 'tsyringe';

import { AuthController } from '@controllers/v1/AuthController';

const authRouter: Router = Router();
const authController = container.resolve(AuthController);

authRouter.post('/login',(req, res, next) => authController.login(req, res, next));
authRouter.post('/register',(req, res, next) => authController.register(req, res, next));

export default authRouter;




