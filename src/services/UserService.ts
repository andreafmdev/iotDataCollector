import { IUserRepository } from '@postgrerepositories/IUserRepository';
import { IUserService } from './IUserService';
import { UserDTO } from '@dto/User/UserDTO';
import { injectable, inject } from 'tsyringe';

import User from '@pgmodels/User';
@injectable()
export class UserService implements IUserService {
    constructor(
        @inject('IUserRepository') private userRepository: IUserRepository
    ) {}

    public async getUser(id: number): Promise<UserDTO | null> {
        const user = await this.userRepository.findById(id);
        if (!user) {
            return null;
        }
        return this.toDTO(user);
    }

    async getAllUser(): Promise<User[]> {
        return await this.userRepository.findAll();
    }


    private toDTO(user: User): UserDTO {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
        };
    }

    private toEntity(userDto: UserDTO): User {
        const user = new User();
        user.id = userDto.id;
        user.firstName = userDto.firstName;
        user.email = userDto.email;
        user.password = userDto.password;
        return user;
    }
}
