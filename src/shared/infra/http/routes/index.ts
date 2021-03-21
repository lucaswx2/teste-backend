import { Router } from 'express';

const routes = Router();

routes.get('/health', (_, response) => {
  return response.json({ message: 'Api is working properly now!' });
});

export default routes;
