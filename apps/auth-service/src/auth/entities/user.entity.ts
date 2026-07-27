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


    @Column({ nullable: true, }) 
    otpHash!: string;

    @Column({ 
        type: 'timestamp', 
        nullable: true, 
    }) 
    otpExpiresAt!: Date;

    @Column({ default: 0, }) 
    otpAttempts!: number;

    @CreateDateColumn() 
    createdAt!: Date; 
    
    @UpdateDateColumn() 
    updatedAt!: Date;

}