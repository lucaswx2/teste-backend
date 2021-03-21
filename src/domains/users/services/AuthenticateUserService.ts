import AppError from '@shared/errorsHandlers/AppError';
import User from '../infra/typeorm/entities/User';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import IUsersRepository from '../repositories/IUsersRepository';
import auth from '@config/auth';
interface IAuthRequest {
  email: string;
  password: string;
}

interface IAuthResponse {
  user: User;
  token: string;
}
export default class AuthenticateUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle({
    email,
    password,
  }: IAuthRequest): Promise<IAuthResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('User or password invalid', 401);
    }

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AppError('User or password invalid', 401);
    }

    return {
      user: user,
      token: jwt.sign(
        {
          email: user.email,
          type_id: user.type_id,
          status: user.status,
        },
        auth.jwt.secret,
        {
          subject: user.id,
          expiresIn: auth.jwt.expiresIn,
        },
      ),
    };
  }
}
