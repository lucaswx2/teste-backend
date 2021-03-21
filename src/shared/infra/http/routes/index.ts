import { Router } from 'express';
import usersRouter from '@domains/users/infra/http/routes/users.routes';
import authRouter from '@domains/users/infra/http/routes/auth.route';

const routes = Router();

routes.get('/health', async (request, response) => {
  return response.json({ message: 'Api is working properly now!' }).status(200);
});

routes.use('/auth', authRouter);
routes.use('/users', usersRouter);

export default routes;
