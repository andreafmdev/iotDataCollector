import { IUserRepository } from './../repositories/postgre/IUserRepository';
import { inject, injectable } from 'tsyringe';
import jwt from 'jsonwebtoken';

import { UserRegistrationDto } from '@dto/User/UserRegistrationDto';
import { UserLoginDto } from '@dto/User/UserLoginDto';
import User from '@models/postgre/User';
import {hashPassword,comparePassword} from '@utils/passwordUtil';
import { IAuthService } from '@services/IAuthService';
@injectable()
export class AuthService implements IAuthService {

    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository
    ) {}

    public async login(userLoginDto:UserLoginDto) :Promise<string> {
        const user = await this.userRepository.findByMail(userLoginDto.email);
        if (!user) {
            throw new Error('Invalid email or password');
        }

        const isPasswordValid = await comparePassword(userLoginDto.password, user.password);
        if (!isPasswordValid) {
            throw new Error('Invalid email or password');
        }

        const token = jwt.sign({ userId: user.id, email: user.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;
    }

    public async register(userReagistrationDto: UserRegistrationDto): Promise<string> {
        const { email, password,firstName,lastName } = userReagistrationDto;
        const existingUser = await this.userRepository.findByMail(email);
        if (existingUser) {
            throw new Error('User already exists');
        }

        const newUser = new User();
        newUser.firstName = firstName;
        newUser.lastName = lastName;
        newUser.email = email;
        newUser.password = await hashPassword(password);
        
        await this.userRepository.save(newUser);

        const token = jwt.sign({ userId: newUser.id, email: newUser.email }, process.env.JWT_SECRET!, { expiresIn: '1h' });
        return token;    
    }
}
