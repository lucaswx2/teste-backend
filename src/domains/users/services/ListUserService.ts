import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';

export default class ListUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle(): Promise<any[]> {
    return [];
  }
}
