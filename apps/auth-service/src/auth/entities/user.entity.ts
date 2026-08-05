import { PrimaryGeneratedColumn,Column,CreateDateColumn,UpdateDateColumn, Entity } from "typeorm";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id!: number;

    @Column({ unique: true, }) 
    email!: string;

    @Column() 
    passwordHash!: string;

    @Column({ default: false, }) 
    isVerified!: boolean;

    @CreateDateColumn() 
    createdAt!: Date; 
    
    @UpdateDateColumn() 
    updatedAt!: Date;

}