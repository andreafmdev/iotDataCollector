import { Table, Column, Model, ForeignKey } from 'sequelize-typescript';
import Role from './Role';
import Permission from './Permission';
//Tabella di mezzo o di giunzione per la relazione molti a molti tra ruoli e permessi
@Table({
  tableName: 'role_permissions',
  timestamps: true,
  paranoid: true,
  underscored: true
})
class RolePermission extends Model {
  @ForeignKey(() => Role)
  @Column
  public roleId!: number;

  @ForeignKey(() => Permission)
  @Column
  public permissionId!: number;
}

export default RolePermission;
