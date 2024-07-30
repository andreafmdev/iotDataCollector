import { IUserRepository } from './../repositories/postgre/IUserRepository';
import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';
import  httpStatusCodes from '@utils/httpStatusCodes';
import { UserRegistrationDto } from '@dto/User/UserRegistrationDto';
import { UserLoginDto } from '@dto/User/UserLoginDto';
import User from '@models/postgre/User';
import {hashPassword,comparePassword} from '@utils/passwordUtil';
import { IAuthService } from '@services/IAuthService';
import AppError from '@errors/AppError';
//import types
import { UserToken } from '@customTypes/UserToken';


//errors const
import userMessageConst from '@utils/user/userMessageConst';


@injectable()
export class AuthService implements IAuthService {

    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository
    ) {}

    public async login(userLoginDto:UserLoginDto) :Promise<string> {
        const user = await this.userRepository.findByMail(userLoginDto.email);
        if (!user) {
            throw new AppError(userMessageConst.USER_INVALID_EMAIL_OR_PASSWORD, httpStatusCodes.UNAUTHORIZED);
        }

        const isPasswordValid = await comparePassword(userLoginDto.password, user.password);
        if (!isPasswordValid) {
            throw new AppError(userMessageConst.USER_INVALID_EMAIL_OR_PASSWORD, httpStatusCodes.UNAUTHORIZED);
        }
        const userToken: UserToken = { userId: user.id, email: user.email };

        const token = jwt.sign(userToken, process.env.JWT_SECRET!, { expiresIn: process.env.JWT_EXP_TIME });
        return token;
    }

    public async register(userReagistrationDto: UserRegistrationDto): Promise<boolean> {
        const { email, password,firstName,lastName } = userReagistrationDto;
        const existingUser = await this.userRepository.findByMail(email);
        if (existingUser) {
            throw new AppError(userMessageConst.USER_ALREADY_EXISTS, httpStatusCodes.CONFLICT);
        }

        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = await hashPassword(password);
        
        await this.userRepository.save(newUser);
        const savedUser = await this.userRepository.findByMail(email);
        if (!savedUser) {
            throw new AppError(userMessageConst.USER_CREATION_FAILED, httpStatusCodes.INTERNAL_SERVER_ERROR);
        }
        return true;    
    }
}
