import { Table, Column, Model, DataType, BelongsToMany,PrimaryKey,AutoIncrement } from 'sequelize-typescript';
import Role from '@models/Role';
import RolePermission from '@models/Permission';

@Table({
  tableName: 'permissions',
  timestamps: true,
  paranoid: true,
  underscored: true
})
class Permission extends Model {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'nome del permesso',

    unique: true
  })
  public name!: string;

  @BelongsToMany(() => Role, () => RolePermission)
  public roles!: Role[];
}

export default Permission;
