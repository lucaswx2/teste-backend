import { Request, Response } from 'express';
import UserRepository from '@domains/users/infra/typeorm/repositories/UsersRepository';
import AuthenticateUserService from '@domains/users/services/AuthenticateUserService';

export default class AuthController {
  public async store(request: Request, response: Response): Promise<Response> {
    const repository = new UserRepository();
    const { name, email, password, type_id, status } = request.body;

    const createUserService = new AuthenticateUserService(repository);

    const result = await createUserService.handle({
      email,
      password,
    });

    return response.json(result).status(200);
  }
}
