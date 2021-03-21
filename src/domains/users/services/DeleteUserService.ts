import IUsersRepository from '../repositories/IUsersRepository';
interface IUserRequest {
  id: string;
}
export default class DeleteUserService {
  constructor(private usersRepository: IUsersRepository) {}
  public async handle({ id }: IUserRequest) {
    await this.usersRepository.deleteById(id);
  }
}
