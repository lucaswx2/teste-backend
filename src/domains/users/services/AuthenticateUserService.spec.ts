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
  it('should be able to authenticate', async () => {});
  it('should not be able with non existing user', async () => {});
  it('should not be able to authenticate with wrong password', async () => {});
});
