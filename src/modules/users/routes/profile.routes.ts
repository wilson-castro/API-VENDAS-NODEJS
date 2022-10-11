import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import PerfilController from '../controllers/PerfilController';

const profileRouter = Router();
const perfilController = new PerfilController();

profileRouter.use(isAuthenticated);
profileRouter.get('/', perfilController.show);
profileRouter.put(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      old_password: Joi.string(),
      password: Joi.string().optional(),
      password_confirmation: Joi.string()
        .valid(Joi.ref('password'))
        .when('password', {
          is: Joi.exist(),
          then: Joi.required(),
        }),
    },
  }),
  perfilController.update,
);

export default profileRouter;
