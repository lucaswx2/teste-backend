import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import UserController from '../controllers/UserController';
import AuthMiddleware from '../middlewares/authMiddleware';
import acl from '@config/acl';

const usersRouter = Router();

const userController = new UserController();

usersRouter.use(AuthMiddleware, acl.authorize);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      typeId: Joi.number().required(),
      status: Joi.boolean().required(),
    },
  }),
  userController.store,
);

usersRouter.put(
  '/:id',
  celebrate({
    [Segments.BODY]: {
      id: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      typeId: Joi.number().required(),
      status: Joi.boolean().required(),
    },
  }),
  userController.update,
);

usersRouter.get('', userController.index);

usersRouter.get('/:id', userController.show);

usersRouter.delete('/:id', userController.delete);

export default usersRouter;
