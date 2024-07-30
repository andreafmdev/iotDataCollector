import { IUserRepository } from '@postgrerepositories/IUserRepository';
import { IUserService } from './IUserService';
import { UserDto } from '@dto/User/UserDto';
import { injectable, inject } from 'tsyringe';

import User from '@pgmodels/User';
@injectable()
export class UserService implements IUserService {
    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository
    ) {}
    

    public async getUser(id: number): Promise<UserDto | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return null;
        }
        return this.toDTO(user);
    }

    public async getAllUser(): Promise<User[]> {
        return await this.userRepository.findAll();
    }

    public async findByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByMail(email);
    }
    public async saveUser(): Promise<UserDto> {
        throw new Error('Method not implemented.');
    }
    private toDTO(user: User): UserDto {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
        };
    }

    private toEntity(userDto: UserDto): User {
        const user = new User();
        user.id = userDto.id;
        user.firstName = userDto.firstName;
        user.email = userDto.email;
        return user;
    }
}
