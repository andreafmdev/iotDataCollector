import { Router } from 'express';
import { container } from 'tsyringe';

import { AuthController } from '@controllers/v1/AuhController';

const authRouter: Router = Router();
const authController = container.resolve(AuthController);

authRouter.post('/login',authController.login.bind(authController));
authRouter.post('/register',authController.register.bind(authController));

export default authRouter;