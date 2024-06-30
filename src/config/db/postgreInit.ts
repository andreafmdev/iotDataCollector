import { Sequelize } from 'sequelize-typescript';
import dotenv from 'dotenv';
import User from '@models/User';
import Role from '@models/Role';
import Permission from '@models/Permission';
import RolePermission from '@models/RolePermission';
dotenv.config();


const pgInit = new Sequelize(
  process.env.PGDATABASE!,
  process.env.PGUSER!,
  process.env.PGPASSWORD!,
  {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT!,10),
    dialect: 'postgres',
    logging: true,
    models: [User, Role, Permission, RolePermission],

  }
);

export default pgInit;
 