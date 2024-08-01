import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';


dotenv.config(); // Carica le variabili d'ambiente dal file .env

console.log('Database Configurations:');
console.log(`Host: ${process.env.PGHOST}`);
console.log(`Port: ${process.env.PGPORT}`);
console.log(`Username: ${process.env.PGUSER}`);
console.log(`Password: ${process.env.PGPASSWORD}`);
console.log(`Database: ${process.env.PGDATABASE}`);
const isProduction = process.env.NODE_ENV === 'production';

const entitiesPath = isProduction
    ? path.join(__dirname, '..', 'dist', 'models', 'postgre', '*.js')
    : path.join(__dirname, '..', '..', 'models', 'postgre', '*.ts');

const migrationsPath = isProduction
    ? path.join(__dirname, '..', 'dist', 'migrations', 'postgre', '*.js')
    : path.join(__dirname, '..', '..', 'migrations', 'postgre', '*.ts');
const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PGHOST!,
    port: parseInt(process.env.PGPORT!, 10),
    username: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    database: process.env.PGDATABASE!,
    entities: [entitiesPath],
    migrations: [migrationsPath],

    namingStrategy: new SnakeNamingStrategy(),
    migrationsTableName: 'migration_system',
    synchronize: false // Imposta questo a false quando usi `schema:sync`


});

export default PostgresDataSource;