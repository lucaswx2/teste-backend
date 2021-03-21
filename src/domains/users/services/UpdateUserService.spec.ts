import FakeUsersRepository from '@domains/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import UpdateUserService from './UpdateUserService';

let fakeUsersRepository: FakeUsersRepository = new FakeUsersRepository();
let createUserService: CreateUserService;
let updateUserService: UpdateUserService;

describe('UpdateUser', () => {
  beforeEach(() => {
    createUserService = new CreateUserService(fakeUsersRepository);
    updateUserService = new UpdateUserService(fakeUsersRepository);
  });
  it('should be update a user', async () => {
    const user = await createUserService.handle({
      email: 'testUser@email.com',
      password: 'test321',
      name: 'Test User',
      status: true,
      type_id: 2,
    });

    user.name = 'Updated name';

    const updatedUser = await updateUserService.handle(user);

    expect(updatedUser.name).toEqual(user.name);
  });
});
