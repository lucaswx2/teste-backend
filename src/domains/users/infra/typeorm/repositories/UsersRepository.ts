import { getRepository, Repository } from 'typeorm';
import IUsersRepository from '@domains/users/repositories/IUsersRepository';
import ICreateUserDTO from '@domains/users/dtos/ICreateUserDTO';
import User from '@domains/users/infra/typeorm/entities/User';

class UsersRepository implements IUsersRepository {
  private repository: Repository<User>;
  constructor() {
    this.repository = getRepository(User);
  }

  async findAll(): Promise<User[]> {
    const users = await this.repository.find();
    return users;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.repository.findOne(id);
    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.repository.findOne({
      email,
    });
    return user;
  }

  async deleteById(id: string): Promise<void> {
    await this.repository.delete(id);
  }

  async create(data: ICreateUserDTO): Promise<User> {
    const created = await this.repository.save(data);
    return created;
  }
  async save(data: User): Promise<User> {
    const entity = Object.assign(new User(), data);
    const user = await this.repository.save(entity);

    return user;
  }
}
export default UsersRepository;
