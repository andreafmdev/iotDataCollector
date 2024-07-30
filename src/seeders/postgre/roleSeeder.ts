import { EntityManager } from 'typeorm';
import Role from '@pgmodels/Role';
import Permission from '@pgmodels/Permission';

export const seedRoles = async (manager: EntityManager) => {
  const readPermission = await manager.findOneBy(Permission, { name: 'READ' });
  const writePermission = await manager.findOneBy(Permission, { name: 'WRITE' });

  if (!readPermission || !writePermission) {
    throw new Error('Permissions not found');
  }

  const adminRole = manager.create(Role, {
    name: 'ADMIN',
    permissions: [readPermission, writePermission],
  });

  await manager.save(adminRole);

  const userRole = manager.create(Role, {
    name: 'USER',
    permissions: [readPermission],
  });

  await manager.save(userRole);
};
