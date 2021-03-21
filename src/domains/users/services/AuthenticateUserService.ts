import AppError from '@shared/errorsHandlers/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
interface IAuthRequest {
  email: string;
  password: string;
}
export default class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle({ email, password }: IAuthRequest): Promise<null> {
    return null;
  }
}
