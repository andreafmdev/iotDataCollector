import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToMany, JoinTable } from 'typeorm';
import Role from '@pgmodels/Role';
@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({
        type: 'varchar',
        length: 100,
        comment: 'Nome'
    })
    firstName!: string;

    @Column({
        type: 'varchar',
        length: 100,
        comment: 'Nome'
    })
    lastName!: string;

    @Column({
        type: 'varchar',
        length: 100,
        unique: true,
        comment: 'Email',
        nullable: false 

    })
    email!: string;

    @Column({
        type: 'varchar',
        length: 255,
        comment: 'password',
        nullable: false 
    })
    password!: string;

    @Column({ default: true })
    isActive!: boolean;

    @Column({ type: 'varchar', length: 255, nullable: true })
    verificationToken?: string ;

    @Column({ type: 'timestamp', nullable: true })
    verifiedAt?: Date;

    @Column({ type: 'varchar', length: 255, nullable: true })
    passwordResetToken?: string ;
  
    @Column({ type: 'timestamp', nullable: true })
    passwordResetExpires?: Date;
  
    @Column({ type: 'timestamp', nullable: true })
    lastLoginAt?: Date;

    @ManyToMany(() => Role, role => role.users)
    @JoinTable({
        name: 'user_roles',
        joinColumn: { name: 'user_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'role_id', referencedColumnName: 'id' }
    })
    roles!: Role[];

    @CreateDateColumn({ default: () => 'NOW()' })
    createdAt!: Date;

    @UpdateDateColumn()
    updatedAt!: Date;
    //funzioni hook
    
    
}

export default User;