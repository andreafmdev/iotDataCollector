import { Table, Column, Model, PrimaryKey, AutoIncrement, Unique, DataType, BeforeUpdate, BeforeCreate, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import Role from '@models/Role';

interface UserAttributes {
  id: number;
  email: string;
  password: string;
  name: string;
  surname: string;

}

export interface UserCreationAttributes extends Optional<UserAttributes, 'id'> { }
//definizione modello 
@Table({
  tableName: 'users',
  timestamps: true,
  paranoid: true, // per il soft delete
  underscored: true
})

class User extends Model<UserAttributes, UserCreationAttributes> {
  @PrimaryKey
  @AutoIncrement
  @Column(DataType.INTEGER)
  public id!: number;

  @Unique
  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Email dell`utente',

  })
  public email!: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    comment: 'Password dell`utente',

  })
  public password!: string;

  @Column({
    type: DataType.STRING,
    comment: 'Nome dell`utente',
  })
  public name?: string;

  @Column({
    type: DataType.STRING,
    comment: 'Cognome dell`utente',

  })
  public surname?: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.INTEGER,
    comment: 'Id per join su tabella dei ruoli',

  })
  public roleId!: number;

  @BelongsTo(() => Role)
  public role!: Role;
  //Methods
  @BeforeUpdate
  @BeforeCreate
  static makeUpperCase(instance: User) {
    // this will be called when an instance is created or updated
    if (instance.name) instance.name = instance.name.toUpperCase();
    if (instance.surname) instance.surname = instance.surname.toUpperCase();

  }
}

export default User;