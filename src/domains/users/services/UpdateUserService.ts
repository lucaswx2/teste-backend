import AppError from '@shared/errorsHandlers/AppError';
import User from '../infra/typeorm/entities/User';
import IUsersRepository from '../repositories/IUsersRepository';
interface IUpdateDTO {
  id: string;
  name: string;
  email: string;
  status?: boolean;
  typeId?: number;
}
export default class UpdateUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle(data: IUpdateDTO): Promise<User | undefined> {
    let user = await this.usersRepository.findById(data.id);

    if (!user) {
      throw new AppError('Trying to update a non existing user', 400);
    }

    user = Object.assign(user, data);

    const updatedUser = await this.usersRepository.save(user);

    return updatedUser;
  }
}
