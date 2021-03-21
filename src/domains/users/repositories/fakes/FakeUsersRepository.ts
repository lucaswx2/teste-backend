import IUsersRepository from '@domains/users/repositories/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/typeorm/entities/User';
import { uuid } from 'uuidv4';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  constructor() {}

  findAll(): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  findById(id: number): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }

  findByEmail(email: string): Promise<User | undefined> {
    return new Promise(resolve => {
      const user = this.users.find(u => u.email === email);

      resolve(user);
    });
  }

  deleteById(id: number): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  update(user: User): Promise<User | undefined> {
    throw new Error('Method not implemented.');
  }
  create(data: ICreateUserDTO): Promise<User> {
    return new Promise(resolve => {
      let user = new User();
      user = {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
        id: Math.random().toFixed(0),
      };
      this.users.push(user);
      resolve(user);
    });
  }
  save(userData: User): Promise<User> {
    throw new Error('Method not implemented.');
  }
}
export default FakeUsersRepository;
