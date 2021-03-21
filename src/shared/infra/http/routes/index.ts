import { Router } from 'express';
import usersRouter from '@domains/users/infra/http/routes/users.routes';

const routes = Router();

routes.get('/health', async (request, response) => {
  return response.json({ message: 'Api is working properly now!' }).status(200);
});

routes.use('/users', usersRouter);

export default routes;
