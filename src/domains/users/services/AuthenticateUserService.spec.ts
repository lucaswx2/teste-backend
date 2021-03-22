import FakeUsersRepository from '@domains/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import AppError from '@shared/errorsHandlers/AppError';
import AuthenticateUserService from './AuthenticateUserService';

let fakeUsersRepository: FakeUsersRepository = new FakeUsersRepository();
let createUserService: CreateUserService;
let authenticateUserService: AuthenticateUserService;
describe('AuthenticateUser', () => {
  beforeEach(() => {
    createUserService = new CreateUserService(fakeUsersRepository);
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository);
  });
  it('should be able to authenticate', async () => {
    await createUserService.handle({
      email: 'testUser@email.com',
      password: 'teste321',
      name: 'Test User',
      status: true,
      typeId: 2,
    });

    const response = await authenticateUserService.handle({
      email: 'testUser@email.com',
      password: 'teste321',
    });

    expect(response).toHaveProperty('token');
  });
  it('should not be able with non existing user', async () => {
    expect(
      authenticateUserService.handle({
        email: 'nonexisting@email.com',
        password: 'test321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should not be able to authenticate with wrong password', async () => {
    await createUserService.handle({
      email: 'testUser2@email.com',
      password: 'test321',
      name: 'Test User',
      status: true,
      typeId: 2,
    });

    await expect(
      authenticateUserService.handle({
        email: 'testUser2@email.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
  it('should throw an error if user does not exists', async () => {
    await expect(
      authenticateUserService.handle({
        email: 'nonExisting@email.com',
        password: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
