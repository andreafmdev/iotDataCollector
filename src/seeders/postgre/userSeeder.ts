import { EntityManager } from 'typeorm';
import User from '@pgmodels/User';
import Role from '@pgmodels/Role';

export const seedUsers = async (manager: EntityManager) => {
  const adminRole = await manager.findOneBy(Role, { name: 'ADMIN' });

  if (!adminRole) {
    throw new Error('Role ADMIN not found');
  }

  const user1 = manager.create(User, {
    firstName: 'Alessandro',
    lastName: 'Ali',
    email: 'john.doe@example.com',
    password: 'password123',
    roles: [adminRole],
  });

  await manager.save(user1);

  const user2 = manager.create(User, {
    firstName: 'Andrea',
    lastName: 'Freddi',
    email: 'freddi.dev@gmail.com',
    password: 'password',
    roles: [adminRole],
  });

  await manager.save(user2);
};
