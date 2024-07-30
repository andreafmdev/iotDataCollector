import { UserLoginDto } from '@dto/User/UserLoginDto';
import {UserRegistrationDto} from '@dto/User/UserRegistrationDto';

export interface IAuthService {
    login(userLoginDto:UserLoginDto): Promise<string>;
    register(UserRegistrationDto:UserRegistrationDto): Promise<string>;
}
