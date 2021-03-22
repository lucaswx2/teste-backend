import FakeUsersRepository from '@domains/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import AppError from '@shared/errorsHandlers/AppError';

let fakeUsersRepository: FakeUsersRepository = new FakeUsersRepository();
let createUserService: CreateUserService;
describe('CreateUser', () => {
  beforeEach(() => {
    createUserService = new CreateUserService(fakeUsersRepository);
  });
  it('should be able to create a new user', async () => {
    const user = await createUserService.handle({
      email: 'testUser@email.com',
      password: 'test321',
      name: 'Test User',
      status: true,
      typeId: 2,
    });

    expect(user).toHaveProperty('id');
  });
  it('should not be able to create a new user with same email from another', async () => {
    await createUserService.handle({
      email: 'repeatTestUser@email.com',
      password: 'test321',
      name: 'Test User',
      status: true,
      typeId: 2,
    });

    await expect(
      createUserService.handle({
        email: 'repeatTestUser@email.com',
        password: 'test321',
        name: 'Test User',
        status: true,
        typeId: 2,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
