import User from '@models/postgre/User';

export interface IUserRepository {
    findById(id: number): Promise<User | null>;
    findAll(): Promise<User[]>;
    findByMail(email: string): Promise<User | null>;
    save(user: User): Promise<User>;
    //update(id: string, user: User): Promise<User | null>;
    //delete(id: string): Promise<boolean>;
}

