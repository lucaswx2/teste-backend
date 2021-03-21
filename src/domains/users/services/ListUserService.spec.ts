import FakeUsersRepository from '@domains/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import ListUserService from '@domains/users/services/ListUserService';

let fakeUsersRepository: FakeUsersRepository = new FakeUsersRepository();
let createUserService: CreateUserService;
let listUserService: ListUserService;

describe('ListUser', () => {
  beforeEach(() => {
    createUserService = new CreateUserService(fakeUsersRepository);
    listUserService = new ListUserService(fakeUsersRepository);
  });
  it('should be able to list all users', async () => {
    const user = await createUserService.handle({
      email: 'testUser@email.com',
      password: 'test321',
      name: 'Test User',
      status: true,
      type_id: 2,
    });

    const user2 = await createUserService.handle({
      email: 'testUser2@email.com',
      password: 'test321',
      name: 'Test User',
      status: true,
      type_id: 2,
    });

    const users = await listUserService.handle();

    expect(users).toEqual(expect.arrayContaining([user, user2]));
  });
});
