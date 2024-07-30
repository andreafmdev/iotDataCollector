// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { injectable } from 'tsyringe';
import { AuthService } from '@services/AuthService';
import { UserLoginDto } from '@dto/User/UserLoginDto';
import { UserRegistrationDto } from '@dto/User/UserRegistrationDto';
import { UserLoginRequest } from '@request/User/UserLoginRequest';
import { UserRegistrationRequest } from '@request/User/UserRegistrationRequest';
import { BaseController } from '@controllers/BaseController';

import httpStatusCodes from '@utils/httpStatusCodes';
import userMessageConst from '@utils/user/userMessageConst';
@injectable()
export class AuthController extends BaseController {
    constructor(
        private authService: AuthService
    ) {
        super();
    }

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password }: UserLoginRequest = req.body;
            const userLoginDto: UserLoginDto = { email, password };

            const token = await this.authService.login(userLoginDto);
            res.status(httpStatusCodes.OK).json({ message: userMessageConst.USER_LOGGED_IN, token });
        } catch (error) {
            next(error);
        }
    }
    public async register(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password, firstName, lastName }: UserRegistrationRequest = req.body;
            const userRegistrationDto: UserRegistrationDto = { email, password, firstName, lastName };

            const created = await this.authService.register(userRegistrationDto);
            res.status(httpStatusCodes.CREATED).json({ message: userMessageConst.USER_REGISTERED, created });
        } catch (error) {
            next(error);
        }
    }
}
