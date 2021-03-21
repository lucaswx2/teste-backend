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
  }: IUserRequest): Promise<any> {
    return null;
  }
}
