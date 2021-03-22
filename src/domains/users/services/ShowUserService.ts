import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

interface IUserRequest {
  id: string;
}
export default class ShowUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle({ id }: IUserRequest): Promise<User | undefined> {
    const user = await this.usersRepository.findById(id);
    return user;
  }
}
