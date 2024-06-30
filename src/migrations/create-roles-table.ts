// migrations/YYYYMMDDHHMMSS-create-roles-table.ts
import { QueryInterface, DataTypes } from 'sequelize';
import Role from '@models/Role';
module.exports = {
  up: async (queryInterface: QueryInterface) => {
    await queryInterface.createTable('roles', {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      createdAt: {
        type: DataTypes.DATE,
        allowNull: false
      },
      updatedAt: {
        type: DataTypes.DATE,
        allowNull: false
      }
    });

    // Inserting initial roles can still be done using the model
    await Role.bulkCreate([
      { name: 'Admin', createdAt: new Date(), updatedAt: new Date() },
      { name: 'User', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },
  
  down: async (queryInterface: QueryInterface) => {
    await queryInterface.dropTable('roles');
  }
};
