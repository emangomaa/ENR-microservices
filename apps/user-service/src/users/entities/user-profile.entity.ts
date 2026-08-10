import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('user_profiles')
export class UserProfile {
  @PrimaryGeneratedColumn()
  id!: number;

  @Index({ unique: true })
  @Column()
  authUserId!: number;

  @Column()
  email!: string;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100
  })  
  firstName!: string | null;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 100
  })
  lastName!: string | null;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 20
  })
  phone!: string | null;

  @Column({
    nullable: true,
    type: 'varchar',
    length: 255
  })
  avatar!: string | null;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}