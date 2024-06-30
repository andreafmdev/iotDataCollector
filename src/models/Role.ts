import { Table, Column, Model, PrimaryKey, AutoIncrement, DataType, HasMany } from 'sequelize-typescript';
import User from './User';

@Table({
    tableName: 'roles',
    timestamps: true,
    paranoid: true,
    underscored: true
})
class Role extends Model {
    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER,
        comment: 'Id ruoli'
    })
    public id!: number;

    @Column({
        type: DataType.STRING,
        comment: 'Nome del ruolo',
        allowNull: false,
        unique: true
    })
    public name!: string;

    @Column({
        type: DataType.TEXT,
        comment: 'Descrizione del ruolo'
    })
    public description!: string;
    
    @HasMany(() => User)
    public users!: User[];
}

export default Role;
