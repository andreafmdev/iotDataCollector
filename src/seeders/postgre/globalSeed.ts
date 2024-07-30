import PostgresDataSource from '@config/db/typeOrm';
import { seedPermissions } from './permissionSeeder';
import { seedRoles } from './roleSeeder';
import { seedUsers } from './userSeeder';

const seedDatabase = async () => {
  try {
    await PostgresDataSource.initialize();
    const manager = PostgresDataSource.manager;

    // Svuota le tabelle se necessario
    await manager.query('TRUNCATE TABLE user_roles, role_permissions, users, roles, permissions RESTART IDENTITY CASCADE;');

    // Esegui i seeder
    await seedPermissions(manager);
    await seedRoles(manager);
    await seedUsers(manager);

    console.log('Database seeding completed!');
  } catch (error) {
    console.error('Error during database seeding:', error);
  } finally {
    await PostgresDataSource.destroy();
  }
};

seedDatabase();
