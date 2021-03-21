import CreateUserService from '@domains/users/services/CreateUserService';
import { Request, Response } from 'express';
import UserRepository from '@domains/users/infra/typeorm/repositories/UsersRepository';
import ListUserService from '@domains/users/services/ListUserService';
import ShowUserService from '@domains/users/services/ShowUserService';
import UpdateUserService from '@domains/users/services/UpdateUserService';
import DeleteUserService from '@domains/users/services/DeleteUserService';
import AppError from '@shared/errorsHandlers/AppError';

export default class UserController {
  public async store(request: Request, response: Response): Promise<Response> {
    const repository = new UserRepository();
    const { name, email, password, type_id, status } = request.body;

    const createUserService = new CreateUserService(repository);

    const user = await createUserService.handle({
      name,
      email,
      password,
      type_id,
      status,
    });
    return response.json(user).status(200);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const repository = new UserRepository();

    const listUsersService = new ListUserService(repository);

    const users = await listUsersService.handle();
    return response.json(users).status(200);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    if (request.user?.role === 'GENERAL' && request.user.id !== id) {
      throw new AppError('Not allowed to see the data from this user');
    }
    const repository = new UserRepository();

    const showUsersService = new ShowUserService(repository);
    const user = await showUsersService.handle({ id });
    return response.json(user);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id, name, email, password, type_id, status } = request.body;

    if (request.params.id !== id) {
      throw new AppError('ids are not the same', 400);
    }
    const repository = new UserRepository();

    const updateUserService = new UpdateUserService(repository);

    const user = await updateUserService.handle({
      id,
      name,
      email,
      password,
      type_id,
      status,
    });
    return response.json(user).status(200);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const repository = new UserRepository();

    const deleteUserService = new DeleteUserService(repository);

    await deleteUserService.handle({ id });
    return response.status(200);
  }
}
