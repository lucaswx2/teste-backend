import IUsersRepository from '@domains/users/repositories/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/typeorm/entities/User';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  constructor() {}

  findAll(): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  deleteById(id: string): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  create(data: ICreateUserDTO): Promise<User> {
    throw new Error('Method not implemented.');
  }
  save(userData: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
export default FakeUsersRepository;
