import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

export default class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle(user: User): Promise<any> {
    return null;
  }
}
