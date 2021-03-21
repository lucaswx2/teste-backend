import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/typeorm/entities/User';

export default interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
  deleteById(id: string): Promise<void>;
  create(data: ICreateUserDTO): Promise<User>;
  save(userData: User): Promise<User>;
}
