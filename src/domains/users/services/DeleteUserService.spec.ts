import FakeUsersRepository from '@domains/users/repositories/fakes/FakeUsersRepository';
import DeleteUserService from '@domains/users/services/DeleteUserService';
import CreateUserService from '@domains/users/services/CreateUserService';
import ListUserService from '@domains/users/services/ListUserService';

let fakeUsersRepository: FakeUsersRepository = new FakeUsersRepository();
let deleteUserService: DeleteUserService;
let createUserService: CreateUserService;
let listUserService: ListUserService;

describe('DeleteUser', () => {
  beforeEach(() => {
    createUserService = new CreateUserService(fakeUsersRepository);
    deleteUserService = new DeleteUserService(fakeUsersRepository);
    listUserService = new ListUserService(fakeUsersRepository);
  });
  it('should be delete a user', async () => {
    const user = await createUserService.handle({
      email: 'testUser@email.com',
      password: 'test321',
      name: 'Test User',
      status: true,
      type_id: 2,
    });

    await deleteUserService.handle({ id: user.id });

    const users = listUserService.handle();

    expect(users).toEqual(expect.not.arrayContaining([user]));
  });
});
