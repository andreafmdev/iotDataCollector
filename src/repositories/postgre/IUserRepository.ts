import User from '@models/postgre/User';

export interface IUserRepository {
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    //create(user: User): Promise<User>;
    //update(id: string, user: User): Promise<User | null>;
    //delete(id: string): Promise<boolean>;
}

