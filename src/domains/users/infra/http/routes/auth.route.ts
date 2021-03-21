import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import AuthMiddleware from '../middlewares/authMiddleware';
import AuthController from '../controllers/AuthController';

const authRouter = Router();

const authController = new AuthController();

authRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  authController.store,
);

export default authRouter;
