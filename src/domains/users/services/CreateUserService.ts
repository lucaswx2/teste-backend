import AppError from '@shared/errorsHandlers/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
interface IUserRequest {
  name: string;
  email: string;
  password: string;
  status: boolean;
  type_id: number;
}
export default class CreateUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle({
    name,
    email,
    password,
    type_id,
    status,
  }: IUserRequest): Promise<User> {
    const userExists = await this.usersRepository.findByEmail(email);

    if (userExists) {
      throw new AppError('User already exists', 400);
    }
    const user = await this.usersRepository.create({
      name,
      email,
      password,
      type_id,
      status,
    });
    console.log(user);
    return user;
  }
}
