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
}

