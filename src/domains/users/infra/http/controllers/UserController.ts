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
    const { name, email, password, typeId, status } = request.body;

    const createUserService = new CreateUserService(repository);

    const user = await createUserService.handle({
      name,
      email,
      password,
      typeId,
      status,
    });
    return response.json(user).status(200);
  }

  public async index(request: Request, response: Response): Promise<Response> {
    const repository = new UserRepository();
    if (request.user?.role === 'GENERAL') {
      throw new AppError(
        'You are not authorized to access this resourcer',
        401,
      );
    }

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
    const { id, name, email, status, typeId } = request.body;
    let updateObj;
    if (request.user?.role === 'GENERAL') {
      updateObj = { id, name: name, email: email };
    } else if (request.user?.role === 'ADMIN') {
      updateObj = { id, name, email, status };
    } else {
      updateObj = { id, name, email, status, typeId };
    }
    if (request.params.id !== id) {
      throw new AppError('ids are not the same', 400);
    }
    const repository = new UserRepository();

    const updateUserService = new UpdateUserService(repository);

    const user = await updateUserService.handle(updateObj);
    return response.json(user).status(200);
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    if (id === request.user?.id) {
      throw new AppError('You cant delete yourself', 401);
    }
    const repository = new UserRepository();

    const deleteUserService = new DeleteUserService(repository);

    await deleteUserService.handle({ id });
    return response.send(200);
  }
}
