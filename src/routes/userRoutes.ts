import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '@controllers/v1/UserController';
import { authMiddleware } from '@middlewares/authMiddleware';

const userRouter: Router = Router();
const userController = container.resolve(UserController);

userRouter.use(authMiddleware);
userRouter.get('/user/:id', (req, res, next) =>  userController.getUser(req, res, next));
userRouter.get('/users', (req, res, next) =>  userController.getAllUsers(req, res, next));

export default userRouter;
