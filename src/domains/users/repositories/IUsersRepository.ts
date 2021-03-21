import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/typeorm/entities/User';

export default interface IUserRepository {
  findAll(): Promise<User | undefined>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(id: string): Promise<User | undefined>;
  deleteById(id: string): Promise<null>;
  update(user: User): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(userData: User): Promise<User>;
}
