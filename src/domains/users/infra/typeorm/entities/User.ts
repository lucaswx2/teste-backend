import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import bcrypt from 'bcryptjs';
import UserType from './UserTypes';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToOne(() => UserType, {
    eager: true,
  })
  @JoinColumn({ referencedColumnName: 'id', name: 'type_id' })
  type?: UserType;

  @Column({ name: 'type_id' })
  typeId: number;

  @Column()
  status: boolean;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export default User;
