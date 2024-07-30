import { Router } from 'express';
import { container } from 'tsyringe';
import { UserController } from '@controllers/v1/UserController';

const userRouter: Router = Router();
const userController = container.resolve(UserController);

userRouter.get('/user/:id', userController.getUser.bind(userController));
userRouter.get('/users', userController.getAllUsers.bind(userController));

export default userRouter;
