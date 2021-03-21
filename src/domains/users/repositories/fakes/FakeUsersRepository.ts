import IUsersRepository from '@domains/users/repositories/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/typeorm/entities/User';
import { v4 } from 'uuid';

class FakeUsersRepository implements IUsersRepository {
  private users: User[] = [];
  constructor() {}

  findAll(): Promise<User[]> {
    return new Promise(resolve => {
      resolve(this.users);
    });
  }
  findById(id: string): Promise<User | undefined> {
    return new Promise(resolve => {
      resolve(this.users.find(user => user.id === id));
    });
  }

  findByEmail(email: string): Promise<User | undefined> {
    return new Promise(resolve => {
      const user = this.users.find(u => u.email === email);

      resolve(user);
    });
  }

  deleteById(id: string): Promise<null> {
    return new Promise(resolve => {
      this.users = this.users.filter(u => u.id !== id);
      resolve(null);
    });
  }

  create(data: ICreateUserDTO): Promise<User> {
    return new Promise(resolve => {
      let user = new User();
      user = {
        ...data,
        created_at: new Date(),
        updated_at: new Date(),
        id: v4(),
      };
      this.users.push(user);
      resolve(user);
    });
  }
  save(data: User): Promise<User> {
    return new Promise(resolve => {
      const findIndex = this.users.findIndex(user => user.id === data.id);
      this.users[findIndex] = data;
      resolve(this.users[findIndex]);
    });
  }
}
export default FakeUsersRepository;
