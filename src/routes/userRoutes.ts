import { Router } from 'express';
import userController from '@controllers/UserController';
import { validateRequest } from '@middlewares/validateRequest';
import { body } from 'express-validator';
import { errorHandler } from '@middlewares/errorHandler';

const router = Router();

router.post('/insert', validateRequest([
    body('email').isEmail().withMessage('Invalid email address'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
]), (req, res, next) => userController.createUser(req, res, next));
router.use(errorHandler);

export default router;
