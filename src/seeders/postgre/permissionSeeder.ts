import { EntityManager } from 'typeorm';
import Permission from '@pgmodels/Permission';

export const seedPermissions = async (manager: EntityManager) => {
  const readPermission = manager.create(Permission, {
    name: 'READ',
  });

  await manager.save(readPermission);

  const writePermission = manager.create(Permission, {
    name: 'WRITE',
  });

  await manager.save(writePermission);
};
