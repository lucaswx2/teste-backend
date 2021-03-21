import IUsersRepository from '@domains/users/repositories/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/typeorm/entities/User';
import { v4 } from 'uuid';
import bcrypt from 'bcryptjs';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  constructor() {}

  async findAll(): Promise<User[]> {
    return this.users;
  }
  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = this.users.find(u => u.email === email);

    return user;
  }

  async deleteById(id: string): Promise<void> {
    this.users = this.users.filter(u => u.id !== id);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    let user = new User();
    user = {
      ...data,
      password: bcrypt.hashSync(data.password, bcrypt.genSaltSync(10)),
      created_at: new Date(),
      updated_at: new Date(),
      id: v4(),
    };
    this.users.push(user);
    return user;
  }
  async save(data: User): Promise<User> {
    const findIndex = this.users.findIndex(user => user.id === data.id);
    this.users[findIndex] = data;
    return this.users[findIndex];
  }
}
export default FakeUsersRepository;
