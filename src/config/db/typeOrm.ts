import { DataSource } from 'typeorm';
import dotenv from 'dotenv';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';


dotenv.config(); // Carica le variabili d'ambiente dal file .env

console.log('Database Configurations:');
console.log(`Host: ${process.env.PGHOST}`);
console.log(`Port: ${process.env.PGPORT}`);
console.log(`Username: ${process.env.PGUSER}`);
console.log(`Password: ${process.env.PGPASSWORD}`);
console.log(`Database: ${process.env.PGDATABASE}`);
const PostgresDataSource = new DataSource({
    type: 'postgres',
    host: process.env.PGHOST!,
    port: parseInt(process.env.PGPORT!, 10),
    username: process.env.PGUSER!,
    password: process.env.PGPASSWORD!,
    database: process.env.PGDATABASE!,
    entities: ['./src/models/postgre/*.ts'],
    migrations: ['./src/migrations/postgre/*.ts'],

    namingStrategy: new SnakeNamingStrategy(),
    migrationsTableName: 'migration_system',
    synchronize: false // Imposta questo a false quando usi `schema:sync`


});

export default PostgresDataSource;