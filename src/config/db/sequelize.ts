import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.PGDATABASE!,
  process.env.PGUSER!,
  process.env.PGPASSWORD!,
  {
    host: process.env.PGHOST,
    port: parseInt(process.env.PGPORT || '5432', 10),
    dialect: 'postgres',
    logging: false,
  }
);

export default sequelize;
 