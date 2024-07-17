import 'reflect-metadata';
import { container } from 'tsyringe';
import { DataSource } from 'typeorm';

import PostgresDataSource from './db/typeOrm';
import { IUserRepository } from '@postgrerepositories/IUserRepository';
import { UserRepository } from '@postgrerepositories/UserRepository';
import { UserService } from '@services/UserService';
import { IUserService } from '@services/IUserService';
import { UserController } from '@controllers/v1/UserController';

// Registrazione del DataSource
container.registerInstance<DataSource>('PostgresDataSource', PostgresDataSource);

// Registrazione dei repository
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);

// Registrazione del servizio
container.registerSingleton<IUserService>('UserService', UserService);

// Registrazione del controller
container.registerSingleton(UserController);

console.log(container); // Aggiungi questo per debug
export { container };
