import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
interface IUserRequest {
  id: number;
}
export default class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle({ id }: IUserRequest): Promise<any> {
    return null;
  }
}
