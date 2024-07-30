// src/controllers/authController.ts
import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'tsyringe';
import { AuthService } from '@services/AuthService';
import { UserLoginDto } from '@dto/User/UserLoginDto';
import { UserRegistrationDto } from '@dto/User/UserRegistrationDto';
import { UserLoginRequest } from '@request/User/UserLoginRequest';
import { UserRegistrationRequest } from '@request/User/UserRegistrationRequest';

@injectable()
export class AuthController {
    constructor(
        @inject(AuthService) private authService: AuthService
    ) {}

    public async login(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const { email, password }:UserLoginRequest = req.body;
            const userLoginDto: UserLoginDto = { email, password };
            
            const token = await this.authService.login(userLoginDto);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
    public async register(req: Request, res: Response, next: NextFunction): Promise<void>{
        try {
            const { email, password,firstName,lastName }:UserRegistrationRequest = req.body;
            const userRegistrationDto: UserRegistrationDto = { email, password,firstName,lastName };
            
            const token = await this.authService.register(userRegistrationDto);
            res.status(200).json({ token });
        } catch (error) {
            next(error);
        }
    }
}
