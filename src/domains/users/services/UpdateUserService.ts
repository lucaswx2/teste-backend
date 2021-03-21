import AppError from '@shared/errorsHandlers/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
interface IUpdateDTO {
  id: string;
  name: string;
  email: string;
  password: string;
  type_id: number;
  status: boolean;
}
export default class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle(data: IUpdateDTO): Promise<any> {
    const user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new AppError('Trying to update a non existing user', 400);
    }
    user.email = data.email;
    user.name = data.name;
    user.status = data.status;
    user.type_id = data.type_id;

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}
