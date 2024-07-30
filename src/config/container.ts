import 'reflect-metadata';
import { container } from 'tsyringe';
import { DataSource } from 'typeorm';

import PostgresDataSource from './db/typeOrm';
//import user 
import { IUserRepository } from '@postgrerepositories/IUserRepository';
import { UserRepository } from '@postgrerepositories/UserRepository';
import { IUserService } from '@services/IUserService';
import { UserService } from '@services/UserService';
import { UserController } from '@controllers/v1/UserController';
//import auth 
import { IAuthService } from '@services/IAuthService';
import { AuthService } from '@services/AuthService';
import { AuthController } from '@controllers/v1/AuhController';

// Registration for DataSource
container.registerInstance<DataSource>('PostgresDataSource', PostgresDataSource);
//Registration for User
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<IUserService>('UserService', UserService);
container.registerSingleton(UserController);

//Registration for Auth
container.registerSingleton(AuthController);
container.registerSingleton<IAuthService>('AuthService', AuthService);

console.log(container); //debug
export { container };
