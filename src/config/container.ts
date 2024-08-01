import 'reflect-metadata';
import { container } from 'tsyringe';
import { DataSource } from 'typeorm';

import PostgresDataSource from './db/typeOrm';
//import user 
import { IUserRepository } from '@postgrerepositories/IUserRepository';
import { UserRepository } from '@postgrerepositories/UserRepository';
import { IUserService } from '@services/IUserService';
import { UserService } from '@services/UserService';
//import auth 
import { IAuthService } from '@services/IAuthService';
import { AuthService } from '@services/AuthService';
//mongo
import { IMeasureRepository } from '@mongorepositories/IMeasureRepository';
import { MeasureRepository } from '@mongorepositories/MeasureRepository';
import { IMeasureService } from '@services/IMeasureService';
import { MeasureService } from '@services/MeasureService';

// Registration for DataSource
container.registerInstance<DataSource>('PostgresDataSource', PostgresDataSource);
//Registration for User
container.registerSingleton<IUserRepository>('IUserRepository', UserRepository);
container.registerSingleton<IUserService>('UserService', UserService);

//Registration for Auth
container.registerSingleton<IAuthService>('AuthService', AuthService);
//Registration for MeasureData
container.registerSingleton<IMeasureRepository>('IMeasureDataRepository', MeasureRepository);
container.registerSingleton<IMeasureService>('IMeasureDataService', MeasureService);

//console.log(container); //debug
export { container };
