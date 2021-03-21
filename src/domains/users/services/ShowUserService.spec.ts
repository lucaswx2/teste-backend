import FakeUsersRepository from '@domains/users/repositories/fakes/FakeUsersRepository';
import CreateUserService from '@domains/users/services/CreateUserService';
import ShowUserService from '@domains/users/services/ShowUserService';

let fakeUsersRepository: FakeUsersRepository = new FakeUsersRepository();
let createUserService: CreateUserService;
let showUserService: ShowUserService;
describe('ShowUser', () => {
  beforeEach(() => {
    createUserService = new CreateUserService(fakeUsersRepository);
    showUserService = new ShowUserService(fakeUsersRepository);
  });
  it('should be able to return a user', async () => {
    const user = await createUserService.handle({
      email: 'testUser@email.com',
      password: 'test321',
      name: 'Test User',
      status: true,
      type_id: 2,
    });

    const returnedUser = await showUserService.handle({ id: user.id });

    expect(returnedUser).toEqual(user);
  });
});
