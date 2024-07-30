import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import User from '@pgmodels/User';
import Permission from '@pgmodels/Permission';

@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 50,
        comment: 'nome del rolo',
        unique: true
        // ...
    })
    name!: string;


    @Column({
        type: 'text',
        comment: 'Descrizione',
        nullable : true
        // ...
    })
    description?: string;

    @Column({ default: true })
    isActive!: boolean;

    @CreateDateColumn({ default: () => 'NOW()' })
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;

    @ManyToMany(() => User, user => user.roles)
    users!: User[];

    @ManyToMany(() => Permission, permission => permission.roles)
    @JoinTable({
        name: 'role_permissions',
        joinColumn: { name: 'role_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'permission_id', referencedColumnName: 'id' }
    })
    permissions!: Permission[];

}

export default Role;