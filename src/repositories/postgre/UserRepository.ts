import User from '@models/postgre/User';
import { IUserRepository } from '@postgrerepositories/IUserRepository';
import { injectable, inject } from 'tsyringe';
import { DataSource, Repository } from 'typeorm';

@injectable()
export class UserRepository implements IUserRepository {
    private userRepository: Repository<User>;

    constructor(
        @inject('PostgresDataSource') private dataSource: DataSource
    ) {
        this.userRepository = this.dataSource.getRepository(User);
    }

    async save(user: User): Promise<User> {
       return await this.userRepository.save(user);
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { id:id,isActive: true } });

        return user;
    }

    async findAll(): Promise<User[] > {
        const user = await this.userRepository.find({
            where: [{ isActive: true}],
            relations: {
                roles: true,
            },
        });

        return user;
    }
    async findByMail(email: string): Promise<User | null> {
        const user = await this.userRepository.findOne({ where: { email:email} });

        return user;
    }
}

