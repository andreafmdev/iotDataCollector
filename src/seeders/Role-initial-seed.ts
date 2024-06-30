import Role from '@models/Role';

module.exports = {
  up: async () => {
    await Role.bulkCreate([
      {
        name: 'Admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'User',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  },
  
  down: async () => {
    await Role.destroy({ where: {} });
  }
};
