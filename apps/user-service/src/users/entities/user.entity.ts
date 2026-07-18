
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({length:100})
  name!: string;

  @Column({ unique: true,length:255 })
  email!: string;

  @Column()
  password!: string;
}